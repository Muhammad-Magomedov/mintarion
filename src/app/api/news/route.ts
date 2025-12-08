import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getRandomArrItem } from "@/shared/utils";
import type { NewsCategoryType } from "@/shared/types/entities/news";
import type { IGetNewsResponse } from "@/entities/news";

const newsTypes: NewsCategoryType[] = ["bullish", "neutral", "bearish"];

export async function GET(req: NextRequest) {
  try {
    const data = Object.fromEntries(req.nextUrl.searchParams.entries());
    if (data?.source === "All") {
      delete data.source;
    }

    if (data?.category === "All") {
      delete data.category;
    }

    const url = `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/news`;
    const response = await axios.post<IGetNewsResponse>(url, {
      ...data,
      limit: 50
    });

    return NextResponse.json(
      {
        ...response.data,
        items: response.data.items.map((item) => ({
          ...item,
          newsType: getRandomArrItem(newsTypes),
        })),
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("/api/news", e);
    return NextResponse.json(
      { message: "Internal server error", error: e },
      { status: 500 }
    );
  }
}
