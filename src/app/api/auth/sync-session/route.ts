import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createAdminClient } from '@/shared/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();
    
    // Получаем данные пользователя
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (userError || !userData.user) {
      console.error('Error fetching user:', userError);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Создаем session token для пользователя
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: userData.user.email!,
    });

    if (sessionError) {
      console.error('Error generating session:', sessionError);
      return NextResponse.json(
        { error: 'Failed to generate session' },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      { 
        message: 'Session synced successfully',
        user: {
          id: userData.user.id,
          email: userData.user.email,
        }
      },
      { status: 200 }
    );

    // Устанавливаем Supabase сессию через cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, {
                ...options,
                httpOnly: false
              })
            })
          },
        },
      }
    );

    // Верифицируем OTP для создания сессии
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: sessionData.properties.hashed_token,
      type: 'magiclink',
    });

    if (verifyError) {
      console.error('Error verifying OTP:', verifyError);
    }

    return response;

  } catch (error) {
    console.error('Error in session sync:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}