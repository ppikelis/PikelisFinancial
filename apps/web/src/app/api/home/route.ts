import { NextResponse } from "next/server";
import { homeMock } from "@/lib/mock";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(homeMock);
}
