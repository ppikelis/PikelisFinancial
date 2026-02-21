export default function StablePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold text-foreground">
          Stable ETFs
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Broad ETFs and simple building blocks.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">Coming soon.</p>
        <a
          className="mt-4 inline-flex text-xs text-muted-foreground underline underline-offset-4"
          href="/getting-started-2"
        >
          Back to Getting Started 2
        </a>
      </section>
      <footer className="rounded-xl border border-border bg-card p-4 text-center text-xs text-muted-foreground">
        This content is educational and not financial advice.
      </footer>
    </main>
  );
}
