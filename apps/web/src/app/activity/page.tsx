import { activityMock } from "@/lib/mock";

const tabs = [
  { id: "congress", label: "Congress" },
  { id: "insider", label: "Insider" },
  { id: "institutional", label: "Institutional" },
  { id: "analyst", label: "Analyst" }
];

export default function ActivityPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Activity feed</div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {tabs.map((tab) => (
            <span
              key={tab.id}
              className="rounded-full border border-border px-3 py-1"
            >
              {tab.label}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Filters</div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border px-3 py-1">
            Last 7 days
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            High confidence
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            Large trades
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="text-sm font-semibold">Activity</div>
        <div className="mt-4 space-y-3 text-sm">
          {activityMock.map((event) => (
            <div key={event.id} className="rounded-md border border-border p-3">
              <div className="font-medium">
                {event.entity} · {event.action} {event.ticker}
              </div>
              <div className="text-xs text-muted-foreground">
                {event.type.toUpperCase()} · {event.date} · Confidence{" "}
                {event.confidence}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
