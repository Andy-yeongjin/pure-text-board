import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hasPrivateAccess, getAuthUser } from '@/lib/auth';
import { filterPlainText } from '@/lib/text-filter';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // ... (기존 GET 로직 유지)
  const id = parseInt(params.id);

  try {
    // 조회수 증가 및 관계 데이터 로드
    const post = await prisma.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      include: { 
        author: { select: { name: true } },
        likes: true,
        comments: {
          include: { author: { select: { name: true } } },
          orderBy: { createdAt: 'asc' }
        }
      },
    });

    if (post.isPrivate) {
      const allowed = hasPrivateAccess(id);
      if (!allowed) {
        return NextResponse.json({ ...post, content: null });
      }
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = parseInt(params.id);

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.authorId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { title, content, isPrivate, privatePw } = await request.json();
    
    let updateData: any = {
      title,
      content: filterPlainText(content),
      isPrivate,
    };

    if (isPrivate && privatePw) {
      updateData.privatePw = await bcrypt.hash(privatePw, 10);
    }

    const updated = await prisma.post.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = parseInt(params.id);

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.authorId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // 연관된 댓글, 좋아요 먼저 삭제 (제약 조건에 따라 필요할 수 있음)
    await prisma.comment.deleteMany({ where: { postId: id } });
    await prisma.like.deleteMany({ where: { postId: id } });
    
    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
