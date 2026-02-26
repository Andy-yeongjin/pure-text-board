import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: Request) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { postId, content } = await request.json();
    
    // 댓글 생성
    const info = db.prepare(`
      INSERT INTO Comment (postId, content, authorId, createdAt, isDeleted)
      VALUES (?, ?, ?, datetime('now'), 0)
    `).run(postId, content, user.id);

    // 생성된 댓글 조회 (작성자 포함)
    const comment = db.prepare(`
      SELECT c.*, u.name as authorName
      FROM Comment c
      JOIN User u ON c.authorId = u.id
      WHERE c.id = ?
    `).get(info.lastInsertRowid);

    return NextResponse.json({
      ...comment,
      author: { name: comment.authorName },
      isDeleted: comment.isDeleted === 1
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
    const id = parseInt(params.id);
    db.prepare('UPDATE Comment SET isDeleted = 1 WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete comment error:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
