import { mockNewsArticles } from "@/lib/mock";

const count = Number.parseInt(process.env.PREVIEW_COUNT ?? "5", 10);

const articles = mockNewsArticles.slice(0, Number.isNaN(count) ? 5 : count);

for (const article of articles) {
  console.log("=".repeat(72));
  console.log(`${article.title}`);
  console.log(`Slug: ${article.slug}`);
  console.log(`Published: ${article.publishedAt}`);
  console.log(`Tickers: ${article.tickers.join(", ") || "None"}`);
  console.log(`Status: ${article.status}`);
  console.log("");
  console.log(article.bodyMarkdown.trim());
  console.log("");
}
