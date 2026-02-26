import { PostDetail } from '@/components/PostDetail';
import { LikeButton } from '@/components/LikeButton';
import { CommentSection } from '@/components/CommentSection';
import { getAuthUser } from '@/lib/auth';
import Link from 'next/link';
import { DeletePostButton } from '@/components/DeletePostButton';
import { cookies } from 'next/headers';

async function getPost(id: string) {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004'}/api/posts/${id}`, { 
    cache: 'no-store',
    headers: {
      'Cookie': allCookies
    }
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function PostDetailPage({ params }: { params: { id: string } } ) {
  const post = await getPost(params.id);
  const user = getAuthUser();

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const liked = user && post.likes ? post.likes.some((l: any) => l.user?._ref === user.id) : false;
  const isAuthor = user && post.authorId === user.id;

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', gap: '10px' }}>
        {isAuthor && (
          <>
            <Link 
              href={`/posts/${post.id}/edit`} 
              style={{ 
                backgroundColor: '#f1f5f9', 
                color: '#475569', 
                padding: '8px 16px', 
                borderRadius: '8px', 
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ✏ 수정하기
            </Link>
            <DeletePostButton postId={post.id} />
          </>
        )}
      </div>
      
      <PostDetail post={post} />
      
      {/* Sanity 통합 후에는 모든 글이 공개글이므로 상호작용 영역 항상 표시 */}
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <LikeButton 
            postId={post.id} 
            initialLikes={post.likes.length} 
            initialLiked={liked}
            viewCount={post.viewCount}
          />
        </div>
        <CommentSection 
          postId={post.id} 
          initialComments={post.comments} 
        />
      </div>
    </main>
  );
}
