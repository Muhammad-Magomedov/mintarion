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

    const { createServerSupabaseClient } =
      await import("@/shared/lib/supabase/server");
    const authSupabase = await createServerSupabaseClient();

    const {
      data: { user: authUser },
      error: authError,
    } = await authSupabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Auth user ID:", authUser.id);
    console.log("Auth user email:", authUser.email);

    // Ищем пользователя в таблице users по ID из auth
    let { data: userRecord, error: userRecordError } = await supabase
      .from("users")
      .select("id, email")
      .eq("id", authUser.id)
      .single();

    // Если пользователь не найден по ID, пробуем найти по email
    if (userRecordError && authUser.email) {
      console.log("User not found by ID, searching by email:", authUser.email);
      const { data: userByEmail, error: emailError } = await supabase
        .from("users")
        .select("id, email")
        .eq("email", authUser.email.toLowerCase())
        .single();

      if (!emailError && userByEmail) {
        userRecord = userByEmail;
        console.log("Found user by email, ID:", userByEmail.id);
      }
    }

    // Если пользователь все еще не найден, создаем запись в таблице users
    if (!userRecord) {
      console.log("Creating new user record in users table");
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          id: authUser.id,
          email: authUser.email || "",
          first_name:
            authUser.user_metadata?.name?.split(" ")[0] ||
            body.author?.firstName ||
            "",
          last_name:
            authUser.user_metadata?.name?.split(" ").slice(1).join(" ") ||
            body.author?.lastName ||
            "",
          avatar_url:
            authUser.user_metadata?.avatar_url ||
            body.author?.avatarUrl ||
            null,
        })
        .select()
        .single();

      if (createError) {
        console.error("Error creating user record:", createError);
        return NextResponse.json(
          { error: "Failed to create user record" },
          { status: 500 }
        );
      }

      userRecord = newUser;
      console.log("Created user record, ID:", newUser.id);
    }

    // Используем правильный ID из таблицы users
    const correctAuthorId = userRecord.id;
    console.log("Using author ID:", correctAuthorId);

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
        author: correctAuthorId, // Используем правильный ID из таблицы users
      })
      .select()
      .single();

    console.log("Insert result - author:", data?.author);
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
