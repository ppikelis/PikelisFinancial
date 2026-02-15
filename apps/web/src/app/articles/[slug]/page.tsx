import { articleMock } from "@/lib/mock";

interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articleMock[params.slug];

  if (!article) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6 text-sm">
          Article not found in mock data.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-xs text-muted-foreground">
          {article.author} · {article.publishedAt}
        </div>
        <h1 className="mt-2 text-2xl font-semibold">{article.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {article.tickers.map((ticker) => (
            <span
              key={ticker}
              className="rounded-full border border-border px-3 py-1 text-xs"
            >
              {ticker}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">TL;DR</div>
        <p className="mt-2 text-sm text-muted-foreground">{article.summary}</p>
        <div className="mt-4 space-y-4 text-sm">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Citations</div>
        <div className="mt-3 space-y-2 text-sm">
          {article.sources.map((source) => (
            <div key={source.label} className="flex justify-between">
              <a className="text-primary" href={source.url}>
                {source.label}
              </a>
              <span className="text-xs text-muted-foreground">
                {source.timestamp}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Disclosures: {article.disclosures.join(" · ")}
        </div>
      </section>
    </main>
  );
}
