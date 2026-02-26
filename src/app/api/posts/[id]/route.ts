import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { hasPrivateAccess, getAuthUser } from '@/lib/auth';
import { filterPlainText } from '@/lib/text-filter';
import bcrypt from 'bcryptjs';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    // 1. 조회수 증가
    db.prepare('UPDATE Post SET viewCount = viewCount + 1 WHERE id = ?').run(id);

    // 2. 게시글 상세 조회 (작성자 포함)
    const post = db.prepare(`
      SELECT p.*, u.name as authorName 
      FROM Post p
      JOIN User u ON p.authorId = u.id
      WHERE p.id = ?
    `).get(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 3. 댓글 목록 조회 (작성자 포함)
    const comments = db.prepare(`
      SELECT c.*, u.name as authorName
      FROM Comment c
      JOIN User u ON c.authorId = u.id
      WHERE c.postId = ? AND c.isDeleted = 0
      ORDER BY c.createdAt ASC
    `).all(id);

    // 4. 좋아요 목록 조회
    const likes = db.prepare('SELECT * FROM Like WHERE postId = ?').all(id);

    // UI 호환성을 위한 데이터 가공
    const formattedPost = {
      ...post,
      author: { name: post.authorName },
      isPrivate: post.isPrivate === 1,
      likes,
      comments: comments.map((c: any) => ({
        ...c,
        author: { name: c.authorName },
        isDeleted: c.isDeleted === 1
      }))
    };

    // 비밀글 권한 체크 (작성자 본인이거나 비번 확인 쿠키가 있는 경우 허용)
    const isActuallyPrivate = formattedPost.isPrivate === true || post.isPrivate === 1;
    
    if (isActuallyPrivate) {
      const user = getAuthUser();
      const isAuthor = user && user.id === formattedPost.authorId;
      const hasCookie = hasPrivateAccess(id);

      if (!isAuthor && !hasCookie) {
        // 본문과 댓글을 모두 숨김
        return NextResponse.json({ 
          ...formattedPost, 
          content: null, 
          comments: [] 
        });
      }
    }

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error('Fetch post detail error:', error);
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
    const post = db.prepare('SELECT * FROM Post WHERE id = ?').get(id);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.authorId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { title, content, isPrivate, privatePw } = await request.json();
    
    let hashedPw = post.privatePw;
    if (isPrivate && privatePw) {
      hashedPw = await bcrypt.hash(privatePw, 10);
    }

    db.prepare(`
      UPDATE Post 
      SET title = ?, content = ?, isPrivate = ?, privatePw = ?
      WHERE id = ?
    `).run(title, filterPlainText(content), isPrivate ? 1 : 0, hashedPw, id);

    const updated = db.prepare('SELECT * FROM Post WHERE id = ?').get(id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update post error:', error);
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
    const post = db.prepare('SELECT * FROM Post WHERE id = ?').get(id);
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.authorId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // 연관 데이터 삭제 (트랜잭션 권장)
    const deleteTx = db.transaction(() => {
      db.prepare('DELETE FROM Comment WHERE postId = ?').run(id);
      db.prepare('DELETE FROM Like WHERE postId = ?').run(id);
      db.prepare('DELETE FROM Post WHERE id = ?').run(id);
    });
    
    deleteTx();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
