import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuthUser } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { postId, content } = await request.json();
    const comment = await prisma.comment.create({
      data: {
        postId,
        content,
        authorId: user.id,
      },
      include: { author: { select: { name: true } } },
    });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 실제 서비스라면 본인 확인 로직 필요
  try {
    await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { isDeleted: true },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
