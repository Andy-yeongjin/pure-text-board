import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const { password } = await request.json();

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || !post.privatePw) {
      return NextResponse.json({ error: 'Not a private post' }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, post.privatePw);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // 권한을 쿠키에 저장 (세션 동안 유효)
    const response = NextResponse.json({ success: true });
    response.cookies.set(`private_access_${id}`, 'true', { maxAge: 3600, httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
