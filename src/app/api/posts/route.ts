import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { filterPlainText } from '@/lib/text-filter';
import { getAuthUser } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // SQL 쿼리로 게시글 목록 및 관계 데이터 조회
    const posts = db.prepare(`
      SELECT 
        p.id, 
        p.title, 
        p.isPrivate, 
        p.viewCount, 
        p.createdAt,
        u.name as authorName,
        (SELECT COUNT(*) FROM Like WHERE postId = p.id) as likeCount,
        (SELECT COUNT(*) FROM Comment WHERE postId = p.id AND isDeleted = 0) as commentCount
      FROM Post p
      JOIN User u ON p.authorId = u.id
      ORDER BY p.createdAt DESC
    `).all();

    // Prisma 응답 형식을 맞추기 위해 데이터 가공 (UI 호환성 유지)
    const formattedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      author: { name: post.authorName },
      isPrivate: post.isPrivate === 1,
      viewCount: post.viewCount,
      createdAt: post.createdAt,
      _count: {
        likes: post.likeCount,
        comments: post.commentCount
      }
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Fetch posts error:', error);
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

    // 게시글 삽입
    const info = db.prepare(`
      INSERT INTO Post (title, content, isPrivate, privatePw, authorId, createdAt, viewCount)
      VALUES (?, ?, ?, ?, ?, datetime('now'), 0)
    `).run(title, cleanContent, isPrivate ? 1 : 0, hashedPw, user.id);

    // 생성된 게시글 조회하여 반환
    const post = db.prepare('SELECT * FROM Post WHERE id = ?').get(info.lastInsertRowid);

    return NextResponse.json(post);
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
