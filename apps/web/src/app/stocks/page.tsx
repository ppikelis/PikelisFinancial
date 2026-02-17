"use client";

import { useEffect, useMemo, useState } from "react";
import { StockSearchBar } from "@/components/StockSearchBar";
import { StockGroupSection } from "@/components/StockGroupSection";
import { TickerRowOrChip } from "@/components/TickerRowOrChip";
import { stockGroups } from "@/lib/mock";

const favoritesKey = "finadvisor:favorites";

export default function StocksPage() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(favoritesKey);
    if (!stored) {
      return;
    }
    try {
      const parsed = JSON.parse(stored) as string[];
      if (Array.isArray(parsed)) {
        setFavorites(parsed);
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  }, [favorites]);

  const flatTickers = useMemo(
    () =>
      stockGroups.flatMap((group) =>
        group.tickers.map((ticker) => ({
          ...ticker,
          groupId: group.id,
          groupName: group.name
        }))
      ),
    []
  );

  const normalizedQuery = query.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }
    return flatTickers.filter((ticker) => {
      const symbolMatch = ticker.symbol
        .toLowerCase()
        .includes(normalizedQuery);
      const nameMatch = ticker.name
        ? ticker.name.toLowerCase().includes(normalizedQuery)
        : false;
      return symbolMatch || nameMatch;
    });
  }, [flatTickers, normalizedQuery]);

  const favoriteTickers = useMemo(
    () => flatTickers.filter((ticker) => favorites.includes(ticker.symbol)),
    [flatTickers, favorites]
  );

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) =>
      prev.includes(symbol)
        ? prev.filter((item) => item !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Stocks</h1>
        <p className="text-sm text-muted-foreground">
          Browse by groups or search.
        </p>
      </header>

      <StockSearchBar value={query} onChange={setQuery} />

      {favoriteTickers.length > 0 ? (
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Favorites
              </h2>
              <p className="text-sm text-muted-foreground">
                Your saved tickers for quick access.
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {favoriteTickers.length} tickers
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {favoriteTickers.map((ticker) => (
              <TickerRowOrChip
                key={`favorite-${ticker.symbol}`}
                ticker={ticker}
                href={`/stocks/${ticker.symbol}`}
                isFavorite={favorites.includes(ticker.symbol)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      ) : null}

      {normalizedQuery ? (
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Search results
              </h2>
              <p className="text-sm text-muted-foreground">
                Matching tickers across all groups.
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {searchResults.length} results
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {searchResults.length > 0 ? (
              searchResults.map((ticker) => (
                <TickerRowOrChip
                  key={`search-${ticker.symbol}`}
                  ticker={ticker}
                  href={`/stocks/${ticker.symbol}`}
                  isFavorite={favorites.includes(ticker.symbol)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                No tickers match your search.
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          {stockGroups.map((group) => (
            <StockGroupSection
              key={group.id}
              group={group}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}
