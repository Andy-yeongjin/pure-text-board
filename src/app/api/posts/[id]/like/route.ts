import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const postId = parseInt(params.id);

  try {
    const existing = db.prepare('SELECT id FROM Like WHERE userId = ? AND postId = ?')
      .get(user.id, postId);

    db.transaction(() => {
      if (existing) {
        db.prepare('DELETE FROM Like WHERE userId = ? AND postId = ?')
          .run(user.id, postId);
      } else {
        db.prepare('INSERT INTO Like (userId, postId) VALUES (?, ?)')
          .run(user.id, postId);
      }
    })();

    const countResult = db.prepare('SELECT COUNT(*) as count FROM Like WHERE postId = ?')
      .get(postId) as any;
    
    return NextResponse.json({ liked: !existing, count: countResult.count });
  } catch (error) {
    console.error('Like toggle error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
