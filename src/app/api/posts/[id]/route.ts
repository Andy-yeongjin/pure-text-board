import { NextResponse } from 'next/server';
import { client, writeClient } from '@/lib/sanity';
import { getAuthUser } from '@/lib/auth';
import { filterPlainText } from '@/lib/text-filter';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    // 1. 조회수 증가 (Atomic Patch)
    await writeClient
      .patch(id)
      .setIfMissing({ viewCount: 0 })
      .inc({ viewCount: 1 })
      .commit();

    // 2. 게시글 상세 조회 (작성자, 댓글, 좋아요 포함)
    const post = await client.fetch(`
      *[_type == "post" && _id == $id][0] {
        "_id": _id,
        "title": title,
        "content": content,
        "viewCount": viewCount,
        "createdAt": publishedAt,
        "authorId": author._ref,
        "author": author-> { name },
        "likes": *[_type == "like" && references(^._id)],
        "comments": *[_type == "comment" && references(^._id) && isDeleted == false] | order(createdAt asc) {
          "_id": _id,
          "content": content,
          "createdAt": createdAt,
          "author": author-> { name }
        }
      }
    `, { id });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // UI 호환성을 위한 데이터 가공
    const formattedPost = {
      ...post,
      id: post._id,
      author: { name: post.author?.name || 'Anonymous' },
      isPrivate: false, // 비밀글 제외
      comments: post.comments.map((c: any) => ({
        id: c._id,
        content: c.content,
        createdAt: c.createdAt,
        author: { name: c.author?.name || 'Anonymous' },
        isDeleted: false
      }))
    };

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
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = params.id;

  try {
    const { title, content } = await request.json();
    
    // 권한 확인을 위해 먼저 조회
    const post = await client.fetch(`*[_id == $id][0]`, { id });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.author._ref !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const updated = await writeClient
      .patch(id)
      .set({
        title,
        content: filterPlainText(content)
      })
      .commit();

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
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = params.id;

  try {
    // 권한 확인을 위해 먼저 조회
    const post = await client.fetch(`*[_id == $id][0]`, { id });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    if (post.author._ref !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // 연관 데이터 삭제 (Sanity는 Transaction 지원하지만 여기서는 단순화)
    // 실제로는 Webhook이나 별도 로직으로 고아 문서를 관리하거나 transaction으로 삭제
    await writeClient.delete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
