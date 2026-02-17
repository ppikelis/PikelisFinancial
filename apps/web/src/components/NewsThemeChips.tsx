"use client";

import { NewsTheme } from "@/lib/mock/news";
import { cn } from "@/lib/utils";

interface NewsThemeChipsProps {
  themes: NewsTheme[];
  selectedThemeId: string | null;
  onSelect: (themeId: string | null) => void;
}

export function NewsThemeChips({
  themes,
  selectedThemeId,
  onSelect
}: NewsThemeChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-full border px-3 py-1 text-xs font-semibold transition",
          selectedThemeId === null
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-muted-foreground hover:text-foreground"
        )}
      >
        All News
      </button>
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onSelect(theme.id)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold transition",
            selectedThemeId === theme.id
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          {theme.label}
        </button>
      ))}
      <button
        type="button"
        className="ml-auto rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
      >
        More
      </button>
    </div>
  );
}
