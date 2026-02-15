import { prisma } from "@/lib/db";

export async function ingestCongressTrades() {
  // Mock placeholder. Replace with disclosure ingestion.
  const source = await prisma.source.upsert({
    where: { url: "https://example.com/congress" },
    update: { retrievedAt: new Date() },
    create: {
      url: "https://example.com/congress",
      publisher: "House.gov",
      retrievedAt: new Date()
    }
  });

  await prisma.activityEvent.create({
    data: {
      type: "CONGRESS_TRADE",
      ticker: { connect: { symbol: "AAPL" } },
      entity: {
        connectOrCreate: {
          where: { name: "Nancy Pelosi" },
          create: { name: "Nancy Pelosi", type: "PERSON" }
        }
      },
      action: "BUY",
      amount: "$50K-$100K",
      occurredAt: new Date(),
      confidence: "high",
      source: { connect: { id: source.id } }
    }
  });
}
