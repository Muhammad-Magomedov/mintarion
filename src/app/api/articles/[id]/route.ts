import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/shared/lib/supabase/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const direction = searchParams.get('direction');

    const { data: currentArticle, error: currentError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .eq('type', 'article')
      .single();

    if (currentError) {
      if (currentError.code === 'PGRST116') {
        return NextResponse.json(
          { error: `Could not found article by ID: ${id}` },
          { status: 404 }
        );
      }
      throw currentError;
    }

    if (!direction || (direction !== 'prev' && direction !== 'next')) {
      return NextResponse.json({ data: currentArticle }, { status: 200 });
    }

    let query = supabase
      .from('posts')
      .select('*')
      .eq('type', 'article');

    if (direction === 'next') {
      query = query
        .gt('created_at', currentArticle.created_at)
        .order('created_at', { ascending: true });
    } else {
      query = query
        .lt('created_at', currentArticle.created_at)
        .order('created_at', { ascending: false });
    }

    const { data: adjacentArticle, error: adjacentError } = await query
      .limit(1)
      .single();

    if (adjacentError) {
      if (adjacentError.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, message: `No ${direction} article available` },
          { status: 200 }
        );
      }
      throw adjacentError;
    }

    return NextResponse.json({ data: adjacentArticle }, { status: 200 });
  } catch (error) {
    console.error('Error during get article:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}