"use client";

import { wealthVersions } from "@/lib/wealth-versions";

export function WealthGettingStarted() {
  const activeVersion = wealthVersions[0];
  const steps = [
    {
      number: 1,
      title: "Automate Your Income",
      text:
        "Your paycheck is the engine. The easiest way to build wealth is to move money automatically — so you don’t rely on motivation.",
      detail: "Set up an automatic transfer the day after you get paid.",
      action: "→ Set up recurring transfer from your bank to brokerage"
    },
    {
      number: 2,
      title: "Build a Safety Cushion",
      text: "Before investing, protect yourself from surprises.",
      detail:
        "Keep 3–6 months of expenses in cash so you don’t need to sell investments during emergencies."
    },
    {
      number: 3,
      title: "Open a Brokerage Account",
      text: "This is where your money works for you.",
      detail:
        "Choose a low-cost broker. Buy diversified ETFs instead of trying to pick winning stocks.",
      action: "→ Start with a broad global ETF"
    },
    {
      number: 4,
      title: "Invest Regularly (Don’t Time the Market)",
      text:
        "Instead of trying to guess the perfect time to invest, you invest the same amount every month.",
      detail:
        "Sometimes prices are high, sometimes low — over time, it balances out."
    },
    {
      number: 5,
      title: "Let Time Do the Heavy Lifting",
      text: "Small gains stack up over years.",
      detail:
        "Markets go up and down. The key is staying invested. A long time horizon reduces stress."
    }
  ];

  if (!activeVersion) {
    return null;
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold text-foreground">Investing</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Simple principles that work.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 md:col-span-2">
          <div className="text-sm font-semibold text-foreground">
            From Paycheck to Power
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Turn steady income into steady progress.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {step.number}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {step.title}
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{step.text}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {step.detail}
                </p>
                {step.action && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {step.action}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="text-sm font-semibold">Key rules</div>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                {activeVersion.key_rules.map((rule) => (
                  <li key={rule}>• {rule}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="text-sm font-semibold">Common mistakes</div>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                {activeVersion.mistakes.map((mistake) => (
                  <li key={mistake}>• {mistake}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="rounded-xl border border-border bg-card p-4 text-center text-xs text-muted-foreground">
        This content is educational and not financial advice.
      </footer>
    </main>
  );
}
