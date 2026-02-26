import { NextResponse } from 'next/server';
import { client, writeClient } from '@/lib/sanity';
import { filterPlainText } from '@/lib/text-filter';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    // GROQ 쿼리로 게시글 목록 및 관계 데이터 조회
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        "_id": _id,
        "title": title,
        "viewCount": viewCount,
        "createdAt": publishedAt,
        "author": author-> { name },
        "likesCount": count(*[_type == "like" && references(^._id)]),
        "commentsCount": count(*[_type == "comment" && references(^._id) && isDeleted == false])
      }
    `);

    // UI 호환성을 위한 데이터 가공
    const formattedPosts = posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      author: { name: post.author?.name || 'Anonymous' },
      viewCount: post.viewCount || 0,
      createdAt: post.createdAt,
      _count: {
        likes: post.likesCount,
        comments: post.commentsCount
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
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, content } = await request.json();
    
    // 순수 텍스트 필터링 적용
    const cleanContent = filterPlainText(content);
    
    // Sanity에 게시글 생성
    const post = await writeClient.create({
      _type: 'post',
      title,
      content: cleanContent,
      author: {
        _type: 'reference',
        _ref: user.id // Sanity User ID
      },
      viewCount: 0,
      publishedAt: new Date().toISOString()
    });

    return NextResponse.json({
      id: post._id,
      title: post.title,
      content: post.content
    });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
