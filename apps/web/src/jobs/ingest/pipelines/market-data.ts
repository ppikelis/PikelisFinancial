import { prisma } from "@/lib/db";

export async function ingestMarketData() {
  // Mock placeholder. Replace with provider fetch + mapping.
  await prisma.ticker.upsert({
    where: { symbol: "AAPL" },
    update: {},
    create: {
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "STOCK"
    }
  });
}
