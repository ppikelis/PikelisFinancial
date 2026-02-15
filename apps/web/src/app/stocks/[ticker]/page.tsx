import { stockMock } from "@/lib/mock";

interface StockPageProps {
  params: { ticker: string };
}

export default function StockPage({ params }: StockPageProps) {
  const data = stockMock[params.ticker.toUpperCase()];

  if (!data) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6 text-sm">
          Ticker not found in mock data.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-5">
        <div className="text-lg font-semibold">
          {data.ticker.symbol} · {data.ticker.name}
        </div>
        <div className="text-sm text-muted-foreground">
          {data.ticker.price} ({data.ticker.changePercent}%)
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 md:col-span-2">
          <div className="text-sm font-semibold">Price chart</div>
          <div className="mt-4 h-56 rounded-lg border border-dashed border-border bg-background" />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-semibold">KPIs</div>
          <div className="mt-4 space-y-2 text-sm">
            {data.kpis.map((kpi) => (
              <div key={kpi.label} className="flex justify-between">
                <span className="text-muted-foreground">{kpi.label}</span>
                <span className="font-medium">{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-semibold">Ratings summary</div>
          <div className="mt-4 space-y-2 text-sm">
            {data.ratings.map((rating) => (
              <div key={rating.label} className="flex justify-between">
                <span className="text-muted-foreground">{rating.label}</span>
                <span className="font-medium">{rating.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-semibold">Activity timeline</div>
          <div className="mt-4 space-y-3 text-sm">
            {data.activity.map((event) => (
              <div key={event.id} className="rounded-md border border-border p-3">
                <div className="font-medium">
                  {event.entity} · {event.action} {event.ticker}
                </div>
                <div className="text-xs text-muted-foreground">
                  {event.type.toUpperCase()} · {event.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <div className="text-sm font-semibold">Related articles</div>
        <div className="mt-4 space-y-3 text-sm">
          {data.relatedArticles.map((article) => (
            <a
              key={article.slug}
              className="block text-sm font-medium"
              href={`/articles/${article.slug}`}
            >
              {article.title}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
