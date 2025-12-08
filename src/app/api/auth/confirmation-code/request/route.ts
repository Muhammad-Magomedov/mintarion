import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/shared/lib/supabase/server';
import { sendConfirmationEmail } from '@/shared/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(user => user.email === email);

    if (existingUser && existingUser.email_confirmed_at) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const { error: insertError } = await supabase
      .from('confirmation_codes')
      .upsert({
        email,
        code: confirmationCode,
        expires_at: expiresAt.toISOString(),
        used: false
      }, {
        onConflict: 'email'
      });

    if (insertError) {
      console.error('Error saving confirmation code:', insertError);
      return NextResponse.json(
        { error: 'Failed to generate confirmation code' },
        { status: 500 }
      );
    }

    // console.log(`Confirmation code for ${email}: ${confirmationCode}`);
    
    try {
      await sendConfirmationEmail(email, confirmationCode);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      await supabase
        .from('confirmation_codes')
        .delete()
        .eq('email', email);
        
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Confirmation code sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in confirmation-code/request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}