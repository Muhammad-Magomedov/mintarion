import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createServerSupabaseClient } from "@/shared/lib/supabase/server";
import { IUpdateUserResponse } from "@/entities/user/model/types";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<IUpdateUserResponse>> {
  try {
    const userId = params.id;
    const supabase = await createServerSupabaseClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Проверяем, что запись в таблице users с userId принадлежит авторизованному пользователю
    const { data: userRecord, error: userRecordError } = await supabase
      .from("users")
      .select("id, email")
      .eq("id", userId)
      .single();

    if (userRecordError || !userRecord) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Проверяем, что пользователь обновляет свой собственный профиль
    // Сравниваем по email (без учета регистра) и по ID
    const emailsMatch =
      userRecord.email?.toLowerCase() === user.email?.toLowerCase();
    const idsMatch = userRecord.id === user.id;

    if (!emailsMatch && !idsMatch) {
      console.log(
        "Forbidden check - userRecord.email:",
        userRecord.email,
        "user.email:",
        user.email,
        "userRecord.id:",
        userRecord.id,
        "user.id:",
        user.id
      );
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: You can only update your own profile",
        },
        { status: 403 }
      );
    }

    const targetUserId = userId;

    const formData = await req.formData();
    const firstName = formData.get("firstname") as string | null;
    const lastName = formData.get("lastname") as string | null;
    const email = formData.get("email") as string | null;
    const avatarFile = formData.get("avatar") as File | null;

    let avatarUrl: string | undefined;

    if (avatarFile && avatarFile.size > 0) {
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${targetUserId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data: oldUser } = await supabase
        .from("users")
        .select("avatar_url")
        .eq("id", targetUserId)
        .single();

      if (oldUser?.avatar_url) {
        const oldPath = oldUser.avatar_url.split("/avatars/")[1];
        if (oldPath) {
          await supabase.storage.from("avatars").remove([`avatars/${oldPath}`]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: true,
          contentType: avatarFile.type,
        });

      if (uploadError) {
        return NextResponse.json(
          {
            success: false,
            error: `Failed to upload avatar: ${uploadError.message}`,
          },
          { status: 500 }
        );
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      avatarUrl = publicUrl;
    }

    const updateData: Record<string, any> = {};
    if (firstName !== null) updateData.first_name = firstName;
    if (lastName !== null) updateData.last_name = lastName;
    if (email !== null) updateData.email = email;
    if (avatarUrl) updateData.avatar_url = avatarUrl;

    updateData.updated_at = new Date().toISOString();

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", targetUserId)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
