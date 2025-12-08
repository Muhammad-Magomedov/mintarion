import { NextResponse } from "next/server";
import { sources } from "@/shared/data/news/source";

export function GET() {
  try {
    return NextResponse.json({ data: sources }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
