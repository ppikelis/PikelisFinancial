"use client";

import Link from "next/link";
import { NewsArticle } from "@/lib/mock/newsArticles";
import { cn } from "@/lib/utils";

interface NewsItemRowProps {
  item: NewsArticle;
  expanded: boolean;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onCopy: (sourceUrl: string) => void;
}

function formatTimeAgo(isoDate: string) {
  const then = new Date(isoDate).getTime();
  const now = new Date().getTime();
  const diffMinutes = Math.max(1, Math.round((now - then) / 60000));
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d`;
}

export function NewsItemRow({
  item,
  expanded,
  isSaved,
  onToggleSave,
  onCopy
}: NewsItemRowProps) {
  const primaryTicker = item.tickers[0] ?? "NEWS";
  const isPositive = (item.movePct ?? 0) >= 0;
  const extraTickers = item.tickers.slice(1, 3);
  const remainingCount =
    item.tickers.length > 3 ? item.tickers.length - 3 : 0;
  const sources = item.sourceUrls ?? [];
  const primarySource = sources[0] ?? "#";

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border px-2 py-0.5 font-semibold text-foreground">
            {primaryTicker}
          </span>
          {extraTickers.map((ticker) => (
            <span
              key={ticker}
              className="rounded-full border border-border px-2 py-0.5 font-semibold text-muted-foreground"
            >
              {ticker}
            </span>
          ))}
          {remainingCount > 0 ? (
            <span className="rounded-full border border-border px-2 py-0.5 font-semibold text-muted-foreground">
              +{remainingCount}
            </span>
          ) : null}
          {item.movePct !== undefined ? (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-semibold",
                isPositive
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-rose-500/10 text-rose-500"
              )}
            >
              {isPositive ? "+" : ""}
              {item.movePct.toFixed(1)}%
            </span>
          ) : null}
          <span>{formatTimeAgo(item.publishedAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => onToggleSave(item.id)}
            className={cn(
              "rounded-md border border-transparent px-2 py-1 transition",
              isSaved
                ? "text-yellow-400 hover:text-yellow-300"
                : "hover:text-foreground"
            )}
            aria-label={isSaved ? "Unsave" : "Save"}
          >
            {isSaved ? "🔖 Saved" : "🔖 Save"}
          </button>
          <button
            type="button"
            onClick={() => onCopy(primarySource)}
            className="rounded-md border border-transparent px-2 py-1 transition hover:text-foreground"
          >
            Copy link
          </button>
          <a
            href={primarySource}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-transparent px-2 py-1 transition hover:text-foreground"
          >
            Open source
          </a>
        </div>
      </div>
      <Link
        href={`/news/${item.slug}`}
        className="mt-3 block text-lg font-semibold text-foreground hover:underline"
      >
        {item.title}
      </Link>
      {expanded ? (
        <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>Sources:</span>
        {sources.slice(0, 3).map((url) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            {url}
          </a>
        ))}
      </div>
    </div>
  );
}
