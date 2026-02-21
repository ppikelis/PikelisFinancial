import { STOCK_GROUPS, STOCK_GROUPS_ORDER, StockDefinition } from "@/lib/data/stocks";

export interface StockTicker extends StockDefinition {}

export interface StockGroup {
  id: string;
  name: string;
  description: string;
  tickers: StockTicker[];
}

const descriptions: Record<string, string> = {
  MAG7: "Mega-cap tech leaders shaping platform ecosystems.",
  "AI Infrastructure": "Hardware, semis, and networks powering AI scale.",
  Nuclear: "Nuclear energy leaders and next-gen reactor plays.",
  "Quantum Computing": "Early leaders in quantum hardware and research.",
  "Flying Taxis": "eVTOL pioneers in urban air mobility."
};

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const stockGroups: StockGroup[] = STOCK_GROUPS_ORDER.map((groupName) => ({
  id: slugify(groupName),
  name: groupName === "MAG7" ? "MAG 7" : groupName,
  description: descriptions[groupName] ?? "Curated coverage from our universe.",
  tickers: STOCK_GROUPS[groupName]
}));
