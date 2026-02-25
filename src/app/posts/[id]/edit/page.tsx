import { PostForm } from '@/components/PostForm';
import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004'}/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const user = getAuthUser();
  const post = await getPost(params.id);

  if (!user || !post || post.authorId !== user.id) {
    redirect(`/posts/${params.id}`);
  }

  return (
    <main>
      <h1 style={{ marginBottom: '30px' }}>게시글 수정</h1>
      <PostForm initialData={post} />
    </main>
  );
}
