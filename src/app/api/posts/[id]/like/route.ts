import { NextResponse } from 'next/server';
import { client, writeClient } from '@/lib/sanity';
import { getAuthUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = getAuthUser();
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const postId = params.id;

  try {
    // 기존 좋아요 확인
    const existing = await client.fetch(`
      *[_type == "like" && post._ref == $postId && user._ref == $userId][0]
    `, { postId, userId: user.id });

    if (existing) {
      await writeClient.delete(existing._id);
    } else {
      await writeClient.create({
        _type: 'like',
        post: { _type: 'reference', _ref: postId },
        user: { _type: 'reference', _ref: user.id }
      });
    }

    // 새로운 좋아요 합계 조회
    const count = await client.fetch(`
      count(*[_type == "like" && post._ref == $postId])
    `, { postId });

    return NextResponse.json({ liked: !existing, count });
  } catch (error) {
    console.error('Like toggle error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
