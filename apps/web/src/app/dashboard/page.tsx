const USE_MOCK_DATA =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA?.toLowerCase() === "true";

export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Signal + narrative workflow (MVP).
          </p>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs">
          {USE_MOCK_DATA ? "Mock data mode" : "Live data mode"}
        </span>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {["Why Now Feed", "Trending Tickers", "Alerts"].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="text-sm font-medium">{item}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Placeholder widget (wireframe).
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-medium">Activity Stream</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Congress + insider + analyst events (mock).
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm font-medium">Credibility Panel</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Sources, timestamps, confidence scores.
          </p>
        </div>
      </section>
    </main>
  );
}
