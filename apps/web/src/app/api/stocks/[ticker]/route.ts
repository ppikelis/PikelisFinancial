import { NextResponse } from "next/server";
import { stockMock } from "@/lib/mock";

export const revalidate = 300;

export async function GET(
  _request: Request,
  { params }: { params: { ticker: string } }
) {
  const data = stockMock[params.ticker.toUpperCase()];
  if (!data) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Ticker not found" } },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}
