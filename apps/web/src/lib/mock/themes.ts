import { Theme } from "@/lib/types";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const descriptions: Record<string, string> = {
  MAG7: "Mega-cap tech leaders defining the modern index core.",
  "AI Infrastructure": "The hardware, networks, and platforms powering AI scale.",
  Nuclear: "Nuclear energy leaders and next-gen reactor plays.",
  "Quantum Computing": "Early leaders in quantum hardware and software research.",
  "Flying Taxis": "eVTOL pioneers working toward urban air mobility."
};

export const themesMock: Theme[] = STOCK_GROUPS_ORDER.map((groupName) => ({
  id: slugify(groupName),
  name: groupName === "MAG7" ? "Magnificent 7" : groupName,
  description: descriptions[groupName] ?? "Curated coverage from our universe.",
  tickers: STOCK_GROUPS[groupName].map((ticker) => ({
    symbol: ticker.symbol,
    label: ticker.name
  }))
}));
