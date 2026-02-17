"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NewsThemeChips } from "@/components/NewsThemeChips";
import { NewsFeed } from "@/components/NewsFeed";
import { useSavedItems } from "@/hooks/useSavedItems";
import { mockNewsArticles, newsThemes } from "@/lib/mock";

const savedKey = "finadvisor:savedNews";

export default function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { savedItems, toggleSaved } = useSavedItems(savedKey);

  const themeParam = searchParams.get("theme");
  const selectedTheme = newsThemes.find((theme) => theme.id === themeParam);

  const selectedLabel = selectedTheme?.label ?? "All News";

  const filteredItems = useMemo(() => {
    // TODO: Replace mockNewsArticles with API fetch.
    let items = mockNewsArticles;
    if (themeParam) {
      items = items.filter((item) => item.themes.includes(themeParam));
    }
    if (!showDrafts) {
      items = items.filter((item) => item.status === "published");
    }
    return items;
  }, [showDrafts, themeParam]);

  const handleSelectTheme = (themeId: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (!themeId) {
      params.delete("theme");
    } else {
      params.set("theme", themeId);
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
      setTimeout(() => setToast(null), 1500);
    } catch {
      setToast("Unable to copy");
      setTimeout(() => setToast(null), 1500);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">News</h1>
        <p className="text-sm text-muted-foreground">
          Latest headlines filtered by theme.
        </p>
      </header>

      <NewsThemeChips
        themes={newsThemes}
        selectedThemeId={selectedTheme?.id ?? null}
        onSelect={handleSelectTheme}
      />

      <NewsFeed
        items={filteredItems}
        selectedLabel={selectedLabel}
        expanded={expanded}
        onToggleExpanded={() => setExpanded((prev) => !prev)}
        showDrafts={showDrafts}
        onToggleDrafts={() => setShowDrafts((prev) => !prev)}
        savedIds={savedItems}
        onToggleSave={toggleSaved}
        onCopy={handleCopyLink}
      />

      {toast ? (
        <div className="fixed bottom-6 right-6 rounded-md bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-lg">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
