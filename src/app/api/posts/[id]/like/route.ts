import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuthUser } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const postId = parseInt(params.id);

  try {
    const existing = await prisma.like.findUnique({
      where: { userId_postId: { userId: user.id, postId } },
    });

    if (existing) {
      await prisma.like.delete({
        where: { userId_postId: { userId: user.id, postId } },
      });
    } else {
      await prisma.like.create({
        data: { userId: user.id, postId },
      });
    }

    const count = await prisma.like.count({ where: { postId } });
    return NextResponse.json({ liked: !existing, count });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
