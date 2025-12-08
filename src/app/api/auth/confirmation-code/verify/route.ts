import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createAdminClient } from '@/shared/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Invalid code format' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: codeData, error: fetchError } = await supabase
      .from('confirmation_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .single();

    if (fetchError || !codeData) {
      return NextResponse.json(
        { error: 'Invalid confirmation code' },
        { status: 400 }
      );
    }

    const now = new Date();
    const expiresAt = new Date(codeData.expires_at);

    if (now > expiresAt) {
      await supabase
        .from('confirmation_codes')
        .delete()
        .eq('email', email)
        .eq('code', code);

      return NextResponse.json(
        { error: 'Confirmation code has expired' },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabase
      .from('confirmation_codes')
      .update({ used: true })
      .eq('email', email)
      .eq('code', code);

    if (updateError) {
      console.error('Error updating confirmation code:', updateError);
      return NextResponse.json(
        { error: 'Failed to verify code' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Code verified successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in confirmation-code/verify:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}