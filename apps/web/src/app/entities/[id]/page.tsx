import { entityMock } from "@/lib/mock";

interface EntityPageProps {
  params: { id: string };
}

export default function EntityPage({ params }: EntityPageProps) {
  const entity = entityMock[params.id];

  if (!entity) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6 text-sm">
          Entity not found in mock data.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-xs text-muted-foreground">
          {entity.type.toUpperCase()}
        </div>
        <div className="mt-1 text-2xl font-semibold">{entity.name}</div>
        <p className="mt-2 text-sm text-muted-foreground">{entity.bio}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Holdings</div>
          <div className="mt-4 space-y-2 text-sm">
            {entity.holdings.map((holding) => (
              <div key={holding.ticker} className="flex justify-between">
                <span>{holding.ticker}</span>
                <span className="text-muted-foreground">
                  {holding.shares} · {holding.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Recent trades</div>
          <div className="mt-4 space-y-2 text-sm">
            {entity.trades.map((trade, index) => (
              <div key={`${trade.ticker}-${index}`} className="flex justify-between">
                <span>
                  {trade.action} {trade.ticker}
                </span>
                <span className="text-muted-foreground">
                  {trade.amount} · {trade.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Performance</div>
        <div className="mt-4 h-48 rounded-lg border border-dashed border-border bg-background" />
      </section>
    </main>
  );
}
