import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { IGetLiquidationsResponse } from "@/entities/liquidation/model";

export async function GET(req: NextRequest) {
  try {
    const data = Object.fromEntries(req.nextUrl.searchParams.entries());

    const url = `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/liquidations`;
    const response = await axios.post<IGetLiquidationsResponse>(url, {
      ...data,
      limit: 50,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (e) {
    console.error("/api/liquidations", e);
    return NextResponse.json(
      { message: "Internal server error", error: e },
      { status: 500 }
    );
  }
}
