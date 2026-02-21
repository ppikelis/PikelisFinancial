import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { STOCK_GROUPS, STOCK_GROUPS_ORDER } from "@/lib/data/stocks";

const isInUniverse = (symbol: string) =>
  STOCK_GROUPS_ORDER.some((group) =>
    STOCK_GROUPS[group].some((stock) => stock.symbol === symbol)
  );

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.toUpperCase();

  if (!symbol) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "Symbol is required." } },
      { status: 400 }
    );
  }

  if (!isInUniverse(symbol)) {
    return NextResponse.json(
      { error: { code: "NOT_TRACKED", message: "Not tracked yet." } },
      { status: 400 }
    );
  }

  const filings = await prisma.secFiling.findMany({
    where: { symbol },
    orderBy: { filingDate: "desc" },
    take: 200,
    include: {
      sections: true
    }
  });

  return NextResponse.json(
    filings.map((filing) => ({
      filingId: filing.id,
      symbol: filing.symbol,
      formType: filing.formType,
      filingDate: filing.filingDate.toISOString(),
      secUrl: filing.secUrl,
      accessionNumber: filing.accessionNumber,
      textContent: filing.textContent,
      sections: filing.sections.map((section) => ({
        sectionName: section.sectionName,
        text: section.text
      }))
    }))
  );
}
