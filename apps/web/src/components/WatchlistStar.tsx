"use client";

import { cn } from "@/lib/utils";
import { useSavedItems } from "@/hooks/useSavedItems";

interface WatchlistStarProps {
  symbol: string;
  storageKey?: string;
}

export function WatchlistStar({
  symbol,
  storageKey = "finadvisor:watchlist"
}: WatchlistStarProps) {
  const { savedItems, toggleSaved } = useSavedItems(storageKey);
  const isSaved = savedItems.includes(symbol);

  return (
    <button
      type="button"
      onClick={() => toggleSaved(symbol)}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-semibold transition",
        isSaved
          ? "border-yellow-400/50 text-yellow-400"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span className="text-base">{isSaved ? "★" : "☆"}</span>
      {isSaved ? "Watchlisted" : "+ Watchlist"}
    </button>
  );
}
