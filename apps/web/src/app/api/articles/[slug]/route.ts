import { NextResponse } from "next/server";
import { articleMock } from "@/lib/mock";

export const revalidate = 600;

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const data = articleMock[params.slug];
  if (!data) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Article not found" } },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}
