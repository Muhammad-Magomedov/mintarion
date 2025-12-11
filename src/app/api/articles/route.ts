import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/shared/temp/data";
import { createAdminClient } from "@/shared/lib/supabase/server";
import type { IArticle } from "@/shared/types/entities/article";

const supabase = createAdminClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");
    const authorId = searchParams.get("author");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    let query = supabase.from("posts").select("*");

    if (type) {
      query = query.eq("type", type);
    }

    if (authorId) {
      query = query.eq("author", authorId);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    if (offset) {
      query = query.range(
        parseInt(offset),
        parseInt(offset) + (limit ? parseInt(limit) - 1 : 9)
      );
    }

    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { data: data.map((item) => ({ ...item, author: item?.raw })) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: IArticle = await request.json();

    console.log(
      "Creating article with imgSrc:",
      body.imgSrc ? `${body.imgSrc.substring(0, 100)}...` : "empty"
    );
    console.log("Body keys:", Object.keys(body));
    console.log("imgSrc type:", typeof body.imgSrc);
    console.log("imgSrc length:", body.imgSrc?.length || 0);

    // if (!body.title || !body.href || !body.author) {
    //   return NextResponse.json(
    //     { error: 'title, href, author required' },
    //     { status: 400 }
    //   );
    // }

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: body.title,
        href: body.href,
        img_src: body.imgSrc || null,
        excerpt: body.excerpt,
        content: body.content,
        type: "article",
        raw: body.author ?? {},
        author: body.author?.id,
      })
      .select()
      .single();

    console.log("Insert result - img_src:", data?.img_src);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Article with this href already exists." },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error during create article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
