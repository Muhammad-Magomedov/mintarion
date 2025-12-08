import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      { 
        message: 'Signed in successfully',
        user: null
      },
      { status: 200 }
    );

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


    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      console.error('Supabase signin error:', signInError);
      
      let errorMessage = 'Invalid email or password';
      if (signInError.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (signInError.message.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email address';
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 401 }
      );
    }

    // response = NextResponse.json(
    //   { 
    //     message: 'Signed in successfully',
    //     user: {
    //       id: authData.user.id,
    //       email: authData.user.email
    //     }
    //   },
    //   { status: 200 }
    // );

    return response;

  } catch (error) {
    console.error('Error in sign-in:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}