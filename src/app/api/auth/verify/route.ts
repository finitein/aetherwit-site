import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

/**
 * GET /api/auth/verify
 * 验证当前登录用户状态
 * 返回用户信息和会话状态
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          user: null,
          message: '未认证',
        },
        { status: 401 }
      );
    }

    const { data: { session } } = await supabase.auth.getSession();

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username || null,
        created_at: user.created_at,
      },
      session: {
        expires_at: session?.expires_at,
      },
    });
  } catch (error) {
    console.error('Auth verify error:', error);
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        user: null,
        message: '服务器错误',
      },
      { status: 500 }
    );
  }
}
