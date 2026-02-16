export default function StocksPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Stocks</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Search or jump directly to a ticker page.
        </p>
      </div>
    </main>
  );
}
