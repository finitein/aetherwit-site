import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

const TOWN_API_URL = process.env.TOWN_API_URL || 'https://townapi.aetherwit.com';
const TOWN_AUTH_SECRET = process.env.TOWN_AUTH_SECRET || '';

/**
 * GET /api/auth/callback
 * 处理认证回调：用 Supabase 会话信息向 Town 后端换取兼容 Token，然后重定向
 *
 * 查询参数：
 * - final_redirect: 可选，最终重定向路径（相对于 town.aetherwit.com）
 *
 * 流程：
 * 1. 从 Supabase 会话获取用户 email / name
 * 2. 调用 Town 后端 /api/v1/auth/login 换取 Town 兼容 token
 * 3. 重定向到 town.aetherwit.com/auth/callback?token={town_token}&final_redirect={path}
 */
export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    const { searchParams } = new URL(request.url);
    const finalRedirect = searchParams.get('final_redirect') || '/';

    // 从 Supabase 会话获取用户信息
    const userEmail = session.user.email;
    const userName =
      session.user.user_metadata?.username ||
      session.user.user_metadata?.name ||
      session.user.email;

    if (!userEmail) {
      console.error('Auth callback: missing email in Supabase session');
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // 调用 Town 后端的 login API 换取兼容 token
    const townLoginRes = await fetch(`${TOWN_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
        password: TOWN_AUTH_SECRET,
      }),
    });

    if (!townLoginRes.ok) {
      const detail = await townLoginRes.text().catch(() => 'unknown error');
      console.error('Auth callback: Town login failed:', townLoginRes.status, detail);
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    const townData = await townLoginRes.json();
    const townToken = townData.token;

    if (!townToken) {
      console.error('Auth callback: Town login response missing token');
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // 构建回调 URL，携带 Town 兼容 token
    const callbackUrl = new URL('https://town.aetherwit.com/auth/callback');
    callbackUrl.searchParams.set('token', townToken);
    callbackUrl.searchParams.set('final_redirect', finalRedirect);

    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

