export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  tickers: string[];
  themeIds: string[];
  source: string;
  sourceUrl: string;
  publishedAt: string;
  movePct?: number;
}

import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

export interface NewsTheme {
  id: string;
  label: string;
}

const baseDate = new Date("2026-02-15T16:00:00Z");

function hoursAgo(hours: number) {
  const date = new Date(baseDate);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

function moveFromSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return Math.round(((hash - 500) / 100) * 10) / 10;
}

const sources = [
  "Bloomberg",
  "CNBC",
  "Reuters",
  "WSJ",
  "TechCrunch",
  "The Information"
];

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const newsThemes: NewsTheme[] = STOCK_GROUPS_ORDER.map((groupName) => ({
  id: slugify(groupName),
  label: groupName === "MAG7" ? "MAG 7" : groupName
}));

const headlineTemplates = [
  "{{ticker}} rallies as demand accelerates across {{theme}}",
  "{{ticker}} unveils new roadmap, reshaping {{theme}} outlook",
  "{{ticker}} posts strong guidance, investors rotate into {{theme}}",
  "{{ticker}} expands partnerships to scale {{theme}} workloads",
  "{{ticker}} hits new milestone amid {{theme}} adoption",
  "{{ticker}} faces volatility as {{theme}} spending shifts",
  "Analysts highlight {{ticker}} as a core {{theme}} play",
  "{{ticker}} bets on efficiency to lead next {{theme}} cycle"
];

function buildNewsForTheme({
  themeId,
  themeLabel,
  tickers,
  crossThemeId
}: {
  themeId: string;
  themeLabel: string;
  tickers: string[];
  crossThemeId?: string;
}) {
  return headlineTemplates.slice(0, 8).map((template, index) => {
    const ticker = tickers[index % tickers.length];
    const headline = template
      .replace("{{ticker}}", ticker)
      .replace("{{theme}}", themeLabel);
    const id = `${themeId}-${index + 1}`;
    return {
      id,
      headline,
      summary:
        "Investors are tracking demand signals, capacity plans, and margin trends as momentum builds. Market participants are watching execution milestones closely.",
      tickers: [ticker],
      themeIds:
        index % 3 === 0 && crossThemeId
          ? [themeId, crossThemeId]
          : [themeId],
      source: sources[index % sources.length],
      sourceUrl: `https://news.example.com/${id}`,
      publishedAt: hoursAgo(index * 6 + tickers.length),
      movePct: moveFromSeed(id)
    };
  });
}

const crossThemeOrder = STOCK_GROUPS_ORDER.map((groupName) =>
  slugify(groupName)
);

export const mockNews: NewsItem[] = STOCK_GROUPS_ORDER.flatMap(
  (groupName, index) => {
    const themeId = slugify(groupName);
    const tickers = STOCK_GROUPS[groupName].map((stock) => stock.symbol);
    const crossThemeId = crossThemeOrder[(index + 1) % crossThemeOrder.length];
    return buildNewsForTheme({
      themeId,
      themeLabel: groupName === "MAG7" ? "MAG 7" : groupName,
      tickers,
      crossThemeId
    });
  }
).sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
