import React from 'react';

interface PostDetailProps {
  post: {
    id: number;
    title: string;
    content: string | null;
    isPrivate: boolean;
    author: { name: string };
    viewCount: number;
    createdAt: string;
  };
}

export const PostDetail = ({ post }: PostDetailProps) => {
  return (
    <div className="card" style={{ marginBottom: '30px' }}>
      <div style={{ 
        height: '300px', 
        backgroundImage: `url(https://picsum.photos/seed/${post.id}/800/400)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
      <div style={{ padding: '40px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 20px 0', lineHeight: 1.2 }}>
            {post.isPrivate && <span style={{ marginRight: '10px' }}>🔒</span>}
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9' }} 
            />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{post.author.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {new Date(post.createdAt).toLocaleString()} • 조회수 {post.viewCount}
              </div>
            </div>
          </div>
        </header>
        
        <div style={{ 
          fontSize: '1.15rem', 
          lineHeight: 1.8, 
          whiteSpace: 'pre-wrap', 
          padding: '30px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          color: '#334155'
        }}>
          {post.isPrivate && post.content === null ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <span style={{ fontSize: '3rem' }}>🔐</span>
              <p style={{ color: '#ef4444', fontWeight: 'bold' }}>비밀글로 보호되고 있습니다.</p>
              <p style={{ color: 'var(--text-muted)' }}>본문을 보려면 비밀번호를 입력하세요.</p>
            </div>
          ) : (
            post.content
          )}
        </div>
        
        <div style={{ marginTop: '30px' }}>
          <a href="/posts" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>← 목록으로 돌아가기</a>
        </div>
      </div>
    </div>
  );
};
