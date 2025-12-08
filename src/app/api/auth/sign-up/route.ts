import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createAdminClient } from '@/shared/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, confirmationCode } = await request.json();

    if (!email || !password || !confirmationCode) {
      return NextResponse.json(
        { error: 'Email, password, and confirmation code are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: codeData, error: fetchError } = await supabase
      .from('confirmation_codes')
      .select('*')
      .eq('email', email)
      .eq('code', confirmationCode)
      .eq('used', true)
      .single();

    if (fetchError || !codeData) {
      return NextResponse.json(
        { error: 'Invalid or unverified confirmation code' },
        { status: 400 }
      );
    }

    const now = new Date();
    const expiresAt = new Date(codeData.expires_at);

    if (now > expiresAt) {
      await supabase
        .from('confirmation_codes')
        .delete()
        .eq('email', email);

      return NextResponse.json(
        { error: 'Confirmation code has expired' },
        { status: 400 }
      );
    }

    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(user => user.email === email);
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const { data: userData, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        email_verified: true
      }
    });

    if (signUpError) {
      console.error('Supabase signup error:', signUpError);
      
      if (signUpError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      );
    }

    await supabase
      .from('confirmation_codes')
      .delete()
      .eq('email', email);

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: userData.user.id,
          email: userData.user.email
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in sign-up:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}