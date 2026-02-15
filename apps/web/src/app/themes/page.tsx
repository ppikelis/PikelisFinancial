import { themesMock } from "@/lib/mock";

export default function ThemesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Themes</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Explore curated baskets and emerging thematic clusters.
        </p>
      </header>

      {themesMock.map((theme) => (
        <section key={theme.id} className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-base font-semibold">{theme.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {theme.description}
              </div>
            </div>
            <a
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              href={`/themes/${theme.id}`}
            >
              View theme
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {theme.tickers.map((ticker) => (
              <a
                key={`${theme.id}-${ticker.symbol}`}
                href={`/stocks/${ticker.symbol}`}
                className="rounded-full border border-border px-3 py-1 text-xs"
              >
                {ticker.symbol}
                {ticker.label ? ` · ${ticker.label}` : ""}
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
