export default function EtfsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold text-foreground">ETFs</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Broad, diversified building blocks.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          ETFs can be a simple way to diversify across many companies.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          This page is for research and learning.
        </p>
        <a
          className="mt-4 inline-flex text-xs text-muted-foreground underline underline-offset-4"
          href="/getting-started-2"
        >
          Back to Planning
        </a>
      </section>
      <footer className="rounded-xl border border-border bg-card p-4 text-center text-xs text-muted-foreground">
        Educational only. Not financial advice.
      </footer>
    </main>
  );
}
