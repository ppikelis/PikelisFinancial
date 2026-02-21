"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LatestArticleItem {
  id: string;
  title: string;
  source: "Your Analysis" | "News";
  timeAgo: string;
  tickers: string[];
  href: string;
}

interface LatestArticlesPanelProps {
  items: LatestArticleItem[];
}

export function LatestArticlesPanel({ items }: LatestArticlesPanelProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-foreground">
          Latest Articles
        </div>
        <Link
          href="/news"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="mt-4 max-h-[360px] space-y-3 overflow-y-auto pr-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-lg border border-border bg-background p-3 transition hover:border-primary/40 hover:bg-muted/20"
          >
            <div className="text-sm font-semibold text-foreground">
              {item.title}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  item.source === "Your Analysis"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {item.source}
              </span>
              <span>{item.timeAgo}</span>
              <span>
                {item.tickers.slice(0, 3).join(", ")}
                {item.tickers.length > 3 ? " +" : ""}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
