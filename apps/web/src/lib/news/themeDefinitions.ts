import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

export interface NewsThemeDefinition {
  id: string;
  label: string;
  tickers: string[];
}

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const newsThemeDefinitions: NewsThemeDefinition[] = STOCK_GROUPS_ORDER.map(
  (groupName) => ({
    id: slugify(groupName),
    label: groupName === "MAG7" ? "MAG 7" : groupName,
    tickers: STOCK_GROUPS[groupName].map((stock) => stock.symbol)
  })
);

export const newsTickerUniverse = Array.from(
  new Set(newsThemeDefinitions.flatMap((theme) => theme.tickers))
);
