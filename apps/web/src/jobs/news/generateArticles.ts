import { prisma } from "@/lib/db";

const USE_MOCK_DATA =
  process.env.USE_MOCK_DATA?.toLowerCase() === "true" ||
  process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";

const AI_AUTHOR_NAME = "AI News Bot";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

function buildArticleMarkdown({
  title,
  summary,
  sources
}: {
  title: string;
  summary: string;
  sources: string[];
}) {
  return `## TL;DR
- ${summary}

## What happened
${title} highlighted shifting expectations across the market.

## Why it matters
Investors are tracking demand signals, guidance updates, and competitive positioning.

## Bull case / Bear case
- **Bull:** demand stays resilient and execution supports margin expansion.
- **Bear:** macro headwinds or competition pressure revenue and guidance.

## What to watch next
Upcoming earnings commentary and any near-term updates from management.

## Sources
${sources.map((url) => `- ${url}`).join("\n")}

---
This is AI-generated and may contain errors; verify sources.
`;
}

export async function generateNewsArticles() {
  if (USE_MOCK_DATA) {
    console.log("Mock mode enabled. Skipping article generation.");
    return;
  }

  const logs: string[] = [];
  const jobRun = await prisma.jobRun.create({
    data: {
      jobName: "generateNewsArticles",
      startedAt: new Date(),
      status: "running",
      logs: ""
    }
  });

  const author =
    (await prisma.author.findFirst({
      where: { name: AI_AUTHOR_NAME }
    })) ??
    (await prisma.author.create({
      data: { name: AI_AUTHOR_NAME }
    }));

  try {
    const rawItems = await prisma.rawNews.findMany({
      orderBy: { publishedAt: "desc" },
      take: 40
    });

    for (const raw of rawItems) {
      const existing = await prisma.article.findFirst({
        where: { rawNewsId: raw.id }
      });
      if (existing) {
        continue;
      }

      const supporting = await prisma.rawNews.findMany({
        where: {
          id: { not: raw.id },
          publishedAt: {
            gte: new Date(raw.publishedAt.getTime() - 1000 * 60 * 60 * 48)
          },
          OR: [
            { tickers: { hasSome: raw.tickers } },
            { themes: { hasSome: raw.themes } }
          ]
        },
        take: 2
      });

      const sources = [
        raw.url,
        ...supporting.map((item) => item.url)
      ].slice(0, 3);

      let slug = slugify(raw.title);
      if (!slug) {
        slug = `news-${raw.id.slice(0, 6)}`;
      }

      const existingSlug = await prisma.article.findUnique({ where: { slug } });
      if (existingSlug) {
        slug = `${slug}-${raw.id.slice(0, 4)}`;
      }

      const markdown = buildArticleMarkdown({
        title: raw.title,
        summary: raw.snippet,
        sources
      });

      await prisma.article.create({
        data: {
          slug,
          title: raw.title,
          summary: raw.snippet,
          content: markdown,
          bodyMarkdown: markdown,
          publishedAt: raw.publishedAt,
          authorId: author.id,
          rawNewsId: raw.id,
          status: "DRAFT",
          tickers: raw.tickers,
          themes: raw.themes,
          sourceUrls: sources
        }
      });
      logs.push(`Drafted article: ${slug}`);
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
