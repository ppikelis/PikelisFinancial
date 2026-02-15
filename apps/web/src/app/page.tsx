import { homeMock } from "@/lib/mock";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 md:col-span-2">
          <div className="text-sm font-semibold">Why now</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Top signals driving today’s moves.
          </p>
          <div className="mt-4 space-y-3">
            {homeMock.activity.map((event) => (
              <div
                key={event.id}
                className="rounded-lg border border-border bg-background p-3 text-sm"
              >
                <div className="font-medium">
                  {event.entity} · {event.action} {event.ticker}
                </div>
                <div className="text-xs text-muted-foreground">
                  {event.type.toUpperCase()} · {event.date} · Confidence{" "}
                  {event.confidence}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-semibold">Trending tickers</div>
          <div className="mt-4 space-y-3">
            {homeMock.trending.map((ticker) => (
              <div key={ticker.symbol} className="text-sm">
                <div className="font-medium">
                  {ticker.symbol} · {ticker.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {ticker.price} ({ticker.changePercent}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <div className="text-sm font-semibold">Latest articles</div>
        <div className="mt-4 space-y-4">
          {homeMock.articles.map((article) => (
            <div key={article.slug} className="border-b border-border pb-4">
              <a className="text-base font-medium" href={`/articles/${article.slug}`}>
                {article.title}
              </a>
              <div className="mt-1 text-sm text-muted-foreground">
                {article.summary}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {article.author} · {article.publishedAt}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
