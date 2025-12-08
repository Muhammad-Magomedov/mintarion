import { NextResponse } from "next/server";
import { categories } from "@/shared/data/news/category";

export function GET() {
  try {
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}