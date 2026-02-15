import { NextResponse } from "next/server";
import { watchlistMock } from "@/lib/mock";

export const revalidate = 30;

export async function GET() {
  return NextResponse.json(watchlistMock);
}

export async function POST() {
  return NextResponse.json(watchlistMock);
}

export async function PUT() {
  return NextResponse.json(watchlistMock);
}

export async function DELETE() {
  return NextResponse.json({ ok: true });
}
