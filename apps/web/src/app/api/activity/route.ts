import { NextResponse } from "next/server";
import { activityMock } from "@/lib/mock";

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const limit = Number(searchParams.get("limit") ?? "20");

  const items = activityMock.filter((event) =>
    type ? event.type === type : true
  );

  return NextResponse.json({
    items: items.slice(0, limit),
    nextCursor: items.length > limit ? "next" : undefined
  });
}
