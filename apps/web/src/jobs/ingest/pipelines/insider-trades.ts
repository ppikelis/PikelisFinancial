import { prisma } from "@/lib/db";

export async function ingestInsiderTrades() {
  // Mock placeholder for SEC Form 4 ingestion.
  await prisma.activityEvent.create({
    data: {
      type: "INSIDER_TRADE",
      ticker: { connect: { symbol: "AAPL" } },
      entity: {
        connectOrCreate: {
          where: { name: "AAPL CFO" },
          create: { name: "AAPL CFO", type: "PERSON" }
        }
      },
      action: "BUY",
      amount: "12,500 shares",
      occurredAt: new Date(),
      confidence: "medium"
    }
  });
}
