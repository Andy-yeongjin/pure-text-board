import { PostDetail } from '@/components/PostDetail';
import { PrivateAuthForm } from '@/components/PrivateAuthForm';
import { LikeButton } from '@/components/LikeButton';
import { CommentSection } from '@/components/CommentSection';
import { getAuthUser } from '@/lib/auth';
import Link from 'next/link';
import { DeletePostButton } from '@/components/DeletePostButton';

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004'}/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const user = getAuthUser();

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const liked = user ? post.likes.some((l: any) => l.userId === user.id) : false;
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
      
      {!post.isPrivate || post.content !== null ? (
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <LikeButton 
              postId={post.id} 
              initialLikes={post.likes.length} 
              initialLiked={liked} 
            />
          </div>
          <CommentSection 
            postId={post.id} 
            initialComments={post.comments} 
          />
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <PrivateAuthForm postId={post.id} />
        </div>
      )}
    </main>
  );
}
