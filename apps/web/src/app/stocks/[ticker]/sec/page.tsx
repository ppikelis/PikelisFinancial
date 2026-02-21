import Link from "next/link";
import { prisma } from "@/lib/db";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";
import { CIK_MAP } from "@/lib/data/cikMap";

interface SecPageProps {
  params: { ticker: string };
  searchParams?: { form?: string };
}

const isInUniverse = (symbol: string) =>
  STOCK_GROUPS_ORDER.some((group) =>
    STOCK_GROUPS[group].some((stock) => stock.symbol === symbol)
  );

const formatDate = (value: Date | null) =>
  value
    ? value.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : "—";

const formFilters = ["10-K", "10-Q", "8-K", "4", "13F"];

export default async function StockSecPage({ params, searchParams }: SecPageProps) {
  const symbol = params.ticker.toUpperCase();

  if (!isInUniverse(symbol)) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6 text-sm">
          Not tracked yet.
        </div>
      </main>
    );
  }

  const cik = CIK_MAP[symbol];
  if (!cik) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border bg-card p-6 text-sm">
          CIK not configured yet.
        </div>
      </main>
    );
  }

  const form = searchParams?.form;
  const filings = await prisma.secFiling.findMany({
    where: {
      symbol,
      ...(form ? { formType: form } : {})
    },
    orderBy: { filingDate: "desc" },
    take: 50
  });

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-lg font-semibold text-foreground">
          {symbol} SEC Filings
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Latest filings from SEC EDGAR. CIK {cik}
        </div>
      </header>

      <section className="flex flex-wrap gap-2 text-xs">
        <Link
          href={`/stocks/${symbol}/sec`}
          className={`rounded-full border border-border px-3 py-1 ${
            !form ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          All
        </Link>
        {formFilters.map((filter) => (
          <Link
            key={filter}
            href={`/stocks/${symbol}/sec?form=${filter}`}
            className={`rounded-full border border-border px-3 py-1 ${
              form === filter
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            {filter}
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        {filings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
            No filings available yet.
          </div>
        ) : (
          filings.map((filing) => (
            <div
              key={filing.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {filing.formType}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {filing.title ?? filing.primaryDoc}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Filed: {formatDate(filing.filingDate)} · Report date:{" "}
                    {formatDate(filing.reportDate)}
                  </div>
                </div>
                <a
                  href={filing.secUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                >
                  Open SEC doc
                </a>
              </div>
              {filing.textContent ? (
                <details className="mt-4 rounded-md border border-border bg-background p-3 text-sm text-muted-foreground">
                  <summary className="cursor-pointer font-semibold text-foreground">
                    View extracted text
                  </summary>
                  <p className="mt-3 whitespace-pre-wrap">{filing.textContent}</p>
                </details>
              ) : (
                <div className="mt-3 text-xs text-muted-foreground">
                  No extracted text available yet.
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
