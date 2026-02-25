import React from 'react';

interface PostSummary {
  id: number;
  title: string;
  author: { name: string };
  isPrivate: boolean;
  viewCount: number;
  createdAt: string;
  _count: { likes: number; comments: number };
}

export const PostList = ({ posts }: { posts: PostSummary[] }) => {
  return (
    <div style={{ padding: '20px 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>최신 피드</h1>
        <p style={{ color: 'var(--text-muted)' }}>{posts.length}개의 게시물</p>
      </header>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {posts.map((post) => (
          <article key={post.id} className="card">
            <a href={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                height: '180px', 
                backgroundColor: '#eee',
                backgroundImage: `url(https://picsum.photos/seed/${post.id}/400/250)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  {post.isPrivate && <span style={{ background: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>PRIVATE</span>}
                </div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', height: '1.5em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {post.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                    {post.author.name}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span>❤ {post._count.likes}</span>
                    <span>💬 {post._count.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};
