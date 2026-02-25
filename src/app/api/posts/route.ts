import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { filterPlainText } from '@/lib/text-filter';
import { getAuthUser } from '@/lib/auth';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {
  // ... (기존 코드 유지)
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        author: { select: { name: true } },
        isPrivate: true,
        viewCount: true,
        createdAt: true,
        _count: {
          select: { likes: true, comments: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, content, isPrivate, privatePw } = await request.json();
    
    // 순수 텍스트 필터링 적용
    const cleanContent = filterPlainText(content);
    
    let hashedPw = null;
    if (isPrivate && privatePw) {
      hashedPw = await bcrypt.hash(privatePw, 10);
    }

    const post = await prisma.post.create({
      data: {
        title,
        content: cleanContent,
        isPrivate,
        privatePw: hashedPw,
        authorId: user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
