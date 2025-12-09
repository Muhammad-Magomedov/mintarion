import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/shared/lib/supabase/server";
import type { IUserProfile } from "@/shared/types/entities/user";
import camelcaseKeys from "camelcase-keys";

export async function GET(req: NextRequest) {
  try {
    let response = NextResponse.next();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, {
                ...options,
                httpOnly: false,
              });
            });
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Получаем профиль пользователя из таблицы users
    const { data: userRecord, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (userError || !userRecord) {
      // Если пользователя нет в таблице users, создаем базовый профиль через Admin Client
      const supabaseAdmin = createAdminClient();

      const nameParts = user.user_metadata?.name?.split(" ") || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const { data: newUser, error: createError } = await supabaseAdmin
        .from("users")
        .insert({
          id: user.id,
          email: user.email,
          first_name: firstName,
          last_name: lastName,
          avatar_url: user.user_metadata?.avatar_url || null,
        })
        .select()
        .single();

      if (createError) {
        console.error("Error creating user profile:", createError);
        return NextResponse.json(
          { error: "Failed to create user profile" },
          { status: 500 }
        );
      }

      const finalResponse = NextResponse.json(
        { data: camelcaseKeys(newUser) },
        { status: 200 }
      );

      // Копируем cookies из промежуточного response
      response.cookies.getAll().forEach(({ name, value }) => {
        finalResponse.cookies.set(name, value, {
          httpOnly: false,
          sameSite: "lax" as const,
          path: "/",
        });
      });

      return finalResponse;
    }

    const finalResponse = NextResponse.json(
      { data: camelcaseKeys(userRecord) },
      { status: 200 }
    );

    // Копируем cookies из промежуточного response
    response.cookies.getAll().forEach(({ name, value }) => {
      finalResponse.cookies.set(name, value, {
        httpOnly: false,
        sameSite: "lax" as const,
        path: "/",
      });
    });

    return finalResponse;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
