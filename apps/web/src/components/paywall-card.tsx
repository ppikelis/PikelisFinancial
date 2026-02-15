export function PaywallCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="text-sm font-semibold">Premium required</div>
      <p className="mt-2 text-sm text-muted-foreground">
        Unlock full analysis, transcripts, and signal dashboards.
      </p>
      <a
        href="/pricing"
        className="mt-4 inline-flex rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground"
      >
        Upgrade to Premium
      </a>
    </div>
  );
}
