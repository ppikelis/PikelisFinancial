"use client";

interface StockSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function StockSearchBar({ value, onChange }: StockSearchBarProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Search
      </div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by ticker or company name"
        className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      />
    </div>
  );
}
