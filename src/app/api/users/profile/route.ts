import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/shared/lib/supabase/server";
import camelcaseKeys from "camelcase-keys";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createServerSupabaseClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { data: null, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Запрашиваем профиль напрямую из таблицы users
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      // Если пользователя нет в таблице, возвращаем базовый профиль из auth
      if (error.code === "PGRST116") {
        return NextResponse.json({
          data: {
            id: user.id,
            email: user.email || "",
            firstName: user.user_metadata?.name?.split(" ")[0] || "",
            lastName:
              user.user_metadata?.name?.split(" ").slice(1).join(" ") || "",
            avatarUrl: user.user_metadata?.avatar_url || null,
          },
          error: null,
        });
      }
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: data ? camelcaseKeys(data) : null,
      error: null,
    });
  } catch (error) {
    console.error("Error getting user profile:", error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

