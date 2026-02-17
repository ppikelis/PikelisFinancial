import { mockNews } from "./news";

export type NewsArticleStatus = "draft" | "review" | "published";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  bodyMarkdown: string;
  tickers: string[];
  themes: string[];
  publishedAt: string;
  status: NewsArticleStatus;
  sourceUrls: string[];
  movePct?: number;
}

function moveFromSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return Math.round(((hash - 500) / 100) * 10) / 10;
}

export const mockNewsArticles: NewsArticle[] = mockNews.slice(0, 48).map(
  (item, index) => {
    const slug = item.id;
    const sourceUrls = [
      item.sourceUrl,
      `https://news.example.com/${item.id}-context`
    ];
    return {
      id: `article-${item.id}`,
      slug,
      title: item.headline,
      summary: item.summary,
      bodyMarkdown: `## TL;DR
- ${item.summary}

## What happened
${item.headline} triggered renewed attention across the market as traders repriced expectations.

## Why it matters
Investors are watching follow-through demand, margin implications, and near-term guidance.

## Bull case / Bear case
- **Bull:** execution stays strong, demand remains resilient, and margins expand.
- **Bear:** spending slows, competition intensifies, and guidance resets lower.

## What to watch next
Upcoming earnings commentary, capacity updates, and any shifts in customer commitments.

## Sources
- ${sourceUrls[0]}
- ${sourceUrls[1]}

---
This is AI-generated and may contain errors; verify sources.
`,
      tickers: item.tickers,
      themes: item.themeIds,
      publishedAt: item.publishedAt,
      status: index % 4 === 0 ? "draft" : "published",
      sourceUrls,
      movePct: item.movePct ?? moveFromSeed(item.id)
    };
  }
);
