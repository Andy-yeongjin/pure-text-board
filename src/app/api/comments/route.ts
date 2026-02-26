import { NextResponse } from 'next/server';
import { client, writeClient } from '@/lib/sanity';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: Request) {
  const user = getAuthUser();
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { postId, content } = await request.json();
    
    // 댓글 생성
    const comment = await writeClient.create({
      _type: 'comment',
      post: { _type: 'reference', _ref: postId },
      author: { _type: 'reference', _ref: user.id },
      content,
      isDeleted: false,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      id: comment._id,
      content: comment.content,
      author: { name: user.name },
      isDeleted: false,
      createdAt: comment.createdAt
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await writeClient
      .patch(id)
      .set({ isDeleted: true })
      .commit();
      
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete comment error:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
