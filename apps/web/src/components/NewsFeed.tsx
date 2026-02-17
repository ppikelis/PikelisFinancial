"use client";

import { NewsArticle } from "@/lib/mock/newsArticles";
import { NewsItemRow } from "@/components/NewsItemRow";

interface NewsFeedProps {
  items: NewsArticle[];
  selectedLabel: string;
  expanded: boolean;
  onToggleExpanded: () => void;
  showDrafts: boolean;
  onToggleDrafts: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onCopy: (sourceUrl: string) => void;
}

export function NewsFeed({
  items,
  selectedLabel,
  expanded,
  onToggleExpanded,
  showDrafts,
  onToggleDrafts,
  savedIds,
  onToggleSave,
  onCopy
}: NewsFeedProps) {
  return (
    <section className="rounded-xl border border-border bg-background p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Feed
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            {selectedLabel}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDrafts}
            className="rounded-md border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
          >
            {showDrafts ? "Hide drafts" : "Show drafts"}
          </button>
          <button
            type="button"
            onClick={onToggleExpanded}
            className="rounded-md border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
          >
            {expanded ? "Hide summaries" : "Show full stories"}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <NewsItemRow
              key={item.id}
              item={item}
              expanded={expanded}
              isSaved={savedIds.includes(item.id)}
              onToggleSave={onToggleSave}
              onCopy={onCopy}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-card px-4 py-6 text-sm text-muted-foreground">
            No articles match this filter yet.
          </div>
        )}
      </div>
    </section>
  );
}
