import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const url = `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/top-news`;
    const response = await axios.get(url);

    return NextResponse.json({ ...response.data }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}