import { NextResponse } from "next/server";
import { filters } from "@/shared/data/articles/filters";

export function GET() {
  try {
    return NextResponse.json({ data: filters }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}