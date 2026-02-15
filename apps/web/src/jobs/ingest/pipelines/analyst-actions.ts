import { prisma } from "@/lib/db";

export async function ingestAnalystActions() {
  // Mock placeholder for analyst actions (manual upload initially).
  await prisma.activityEvent.create({
    data: {
      type: "ANALYST_ACTION",
      ticker: { connect: { symbol: "AAPL" } },
      entity: {
        connectOrCreate: {
          where: { name: "UBS" },
          create: { name: "UBS", type: "INSTITUTION" }
        }
      },
      action: "UPGRADE_TO_BUY",
      occurredAt: new Date(),
      confidence: "high"
    }
  });
}
