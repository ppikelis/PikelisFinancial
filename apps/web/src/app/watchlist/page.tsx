import { watchlistMock } from "@/lib/mock";

export default function WatchlistPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Watchlist & Alerts</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Track tickers, investors, and alert rules.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Watchlist</div>
          <div className="mt-4 space-y-2 text-sm">
            {watchlistMock.items.map((ticker) => (
              <div key={ticker} className="flex justify-between">
                <span>{ticker}</span>
                <a className="text-primary" href={`/stocks/${ticker}`}>
                  Open
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Alert rules</div>
          <div className="mt-4 space-y-2 text-sm">
            {watchlistMock.rules.map((rule) => (
              <div key={rule.id} className="flex justify-between">
                <span>{rule.type.replace(/_/g, " ")}</span>
                <span className="text-muted-foreground">
                  {rule.enabled ? "On" : "Off"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Notifications</div>
        <div className="mt-4 space-y-3 text-sm">
          {watchlistMock.notifications.map((note) => (
            <div key={note.id} className="rounded-md border border-border p-3">
              <div className="font-medium">{note.title}</div>
              <div className="text-sm text-muted-foreground">{note.message}</div>
              <div className="text-xs text-muted-foreground">
                {note.createdAt} · {note.read ? "Read" : "Unread"}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
