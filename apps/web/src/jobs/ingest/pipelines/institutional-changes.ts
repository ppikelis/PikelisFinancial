import { prisma } from "@/lib/db";

export async function ingestInstitutionalChanges() {
  // Mock placeholder for 13F changes.
  await prisma.activityEvent.create({
    data: {
      type: "INSTITUTIONAL_CHANGE",
      ticker: { connect: { symbol: "MSFT" } },
      entity: {
        connectOrCreate: {
          where: { name: "Vanguard" },
          create: { name: "Vanguard", type: "INSTITUTION" }
        }
      },
      action: "INCREASE",
      amount: "+1.2M shares",
      occurredAt: new Date(),
      confidence: "medium"
    }
  });
}
