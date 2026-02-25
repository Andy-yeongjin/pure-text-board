import { PostList } from '@/components/PostList';

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004'}/api/posts`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <main>
      <PostList posts={posts} />
    </main>
  );
}
