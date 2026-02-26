import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id; // parseInt 제거
  const { password } = await request.json();

  try {
    const post = db.prepare('SELECT privatePw, isPrivate FROM Post WHERE id = ?').get(id) as any;
    
    if (!post || !post.privatePw || post.isPrivate === 0) {
      return NextResponse.json({ error: 'Not a private post' }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, post.privatePw);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // 권한을 쿠키에 저장
    const response = NextResponse.json({ success: true });
    response.cookies.set(`private_access_${id}`, 'true', { maxAge: 3600, httpOnly: true, path: '/' });
    return response;
  } catch (error) {
    console.error('Verify password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
