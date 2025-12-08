import { NextRequest, NextResponse } from "next/server";
import { aiConfig } from "@/shared/config/ai";
import { envConfig } from "@/shared/config/env";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    const body = await request.json();
    const { message, userId } = body;

    if (!type) {
      return NextResponse.json(
        { error: "AI type is required" },
        { status: 400 }
      );
    }

    if (!message || !userId) {
      return NextResponse.json(
        { error: "userId and message are required" },
        { status: 400 }
      );
    }

    if (!aiConfig.types.includes(type)) {
        return NextResponse.json(
            { error: "AI type does not exist" },
            { status: 400 }
        )
    }

    const url = `${envConfig.EXTERNAL_API_URL}/api/ai?type=${type || "gpt"}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({ message, userId }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("No response body from backend");
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            const text = decoder.decode(value, { stream: true });
            controller.enqueue(new TextEncoder().encode(text));
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });

  } catch (error: any) {
    console.error("Error in AI route:", error);
    
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}