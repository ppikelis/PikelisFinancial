export default function PricingPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Pricing</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Upgrade for full articles, transcripts, and alerts.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Free</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Limited articles</li>
            <li>Basic activity feed</li>
            <li>Watchlist</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-sm font-semibold">Premium</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Full research library</li>
            <li>Transcripts + citations</li>
            <li>Advanced alerts</li>
          </ul>
          <button className="mt-4 rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground">
            Upgrade (Stripe Checkout)
          </button>
        </div>
      </section>
    </main>
  );
}
