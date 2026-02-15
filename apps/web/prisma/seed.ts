import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
