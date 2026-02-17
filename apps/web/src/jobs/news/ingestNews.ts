import Parser from "rss-parser";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { SourceType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { newsSources } from "./sources";
import {
  newsThemeDefinitions,
  newsTickerUniverse
} from "@/lib/news/themeDefinitions";

const USE_MOCK_DATA =
  process.env.USE_MOCK_DATA?.toLowerCase() === "true" ||
  process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";

const robotsCache = new Map<string, string[]>();

function normalizeUrl(url: string) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

async function getRobotsRules(origin: string) {
  if (robotsCache.has(origin)) {
    return robotsCache.get(origin) ?? [];
  }
  try {
    const response = await fetch(`${origin}/robots.txt`);
    const text = await response.text();
    const lines = text.split("\n");
    const rules: string[] = [];
    let inStarAgent = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }
      if (trimmed.toLowerCase().startsWith("user-agent:")) {
        const agent = trimmed.split(":")[1]?.trim() ?? "";
        inStarAgent = agent === "*";
        continue;
      }
      if (inStarAgent && trimmed.toLowerCase().startsWith("disallow:")) {
        const path = trimmed.split(":")[1]?.trim() ?? "";
        if (path) {
          rules.push(path);
        }
      }
    }
    robotsCache.set(origin, rules);
    return rules;
  } catch {
    robotsCache.set(origin, []);
    return [];
  }
}

async function isAllowedByRobots(url: string) {
  try {
    const parsed = new URL(url);
    const rules = await getRobotsRules(parsed.origin);
    if (rules.length === 0) {
      return true;
    }
    return !rules.some((rule) => parsed.pathname.startsWith(rule));
  } catch {
    return false;
  }
}

function extractTickers(text: string) {
  const found = new Set<string>();
  const upperText = text.toUpperCase();
  for (const ticker of newsTickerUniverse) {
    const regex = new RegExp(`\\b\\$?${ticker}\\b`, "i");
    if (regex.test(upperText)) {
      found.add(ticker);
    }
  }
  return Array.from(found);
}

function mapThemesFromTickers(tickers: string[]) {
  const themes = newsThemeDefinitions
    .filter((theme) => theme.tickers.some((ticker) => tickers.includes(ticker)))
    .map((theme) => theme.id);
  return Array.from(new Set(themes));
}

function buildSnippet(text: string) {
  return text.trim().slice(0, 280);
}

async function fetchReadableText(url: string) {
  if (!(await isAllowedByRobots(url))) {
    return null;
  }
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html, { url });
  const doc = dom.window.document;
  const canonical =
    doc.querySelector("link[rel='canonical']")?.getAttribute("href") ?? url;
  const reader = new Readability(doc);
  const article = reader.parse();
  if (!article?.textContent) {
    return { canonicalUrl: canonical, contentText: null };
  }
  return {
    canonicalUrl: canonical,
    contentText: article.textContent.trim().slice(0, 500)
  };
}

export async function ingestNews() {
  if (USE_MOCK_DATA) {
    console.log("Mock ingestion enabled. Skipping news ingestion.");
    return;
  }

  const parser = new Parser();
  const logs: string[] = [];
  const jobRun = await prisma.jobRun.create({
    data: {
      jobName: "ingestNews",
      startedAt: new Date(),
      status: "running",
      logs: ""
    }
  });

  try {
    for (const source of newsSources) {
      if (!source.enabled || !source.rssUrl) {
        continue;
      }

      const feed = await parser.parseURL(source.rssUrl);
      await prisma.source.upsert({
        where: { url: source.url },
        update: {
          name: source.name,
          type: source.type.toUpperCase() as SourceType,
          enabled: source.enabled,
          publisher: source.name,
          retrievedAt: new Date()
        },
        create: {
          name: source.name,
          type: source.type.toUpperCase() as SourceType,
          enabled: source.enabled,
          url: source.url,
          publisher: source.name,
          retrievedAt: new Date()
        }
      });
      logs.push(`Fetched RSS: ${source.name} (${feed.items?.length ?? 0})`);

      for (const item of feed.items ?? []) {
        const rawUrl = item.link ?? item.guid;
        if (!rawUrl) {
          continue;
        }
        const normalizedUrl = normalizeUrl(rawUrl);
        let contentText: string | null = null;
        let canonicalUrl = normalizedUrl;

        if (source.allowFullText) {
          const readable = await fetchReadableText(normalizedUrl);
          if (readable) {
            canonicalUrl = normalizeUrl(readable.canonicalUrl);
            contentText = readable.contentText;
          }
        }

        const title = item.title ?? "Untitled";
        const snippetSource =
          item.contentSnippet ?? item.content ?? item.summary ?? "";
        const snippet = buildSnippet(contentText ?? snippetSource);
        const publishedAt = item.pubDate
          ? new Date(item.pubDate)
          : new Date();
        const tickerMatches = extractTickers(
          `${title} ${snippet} ${contentText ?? ""}`
        );
        const themeMatches = mapThemesFromTickers(tickerMatches);

        await prisma.rawNews.upsert({
          where: { url: canonicalUrl },
          update: {
            title,
            snippet,
            publisher: source.name,
            publishedAt,
            contentText,
            tickers: tickerMatches,
            themes: themeMatches,
            fetchedAt: new Date()
          },
          create: {
            url: canonicalUrl,
            title,
            snippet,
            publisher: source.name,
            publishedAt,
            contentText,
            tickers: tickerMatches,
            themes: themeMatches,
            fetchedAt: new Date()
          }
        });
      }
    }

    await prisma.jobRun.update({
      where: { id: jobRun.id },
      data: {
        status: "success",
        endedAt: new Date(),
        logs: logs.join("\n")
      }
    });
  } catch (error) {
    await prisma.jobRun.update({
      where: { id: jobRun.id },
      data: {
        status: "failed",
        endedAt: new Date(),
        logs: `${logs.join("\n")}\n${String(error)}`
      }
    });
    throw error;
  }
}
