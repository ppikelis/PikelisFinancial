import { NextResponse } from "next/server";
import { entityMock } from "@/lib/mock";

export const revalidate = 600;

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const data = entityMock[params.id];
  if (!data) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Entity not found" } },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}
