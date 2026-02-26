'use client';

import React from 'react';

interface PostDetailProps {
  post: {
    id: string;
    title: string;
    content: string | null;
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
          padding: '40px 30px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          color: '#334155',
          textAlign: 'left'
        }}>
          {post.content}
        </div>
        
        <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
          <a 
            href="/posts" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: 'white',
              border: '2px solid var(--primary)',
              color: 'var(--primary)',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '700',
              transition: 'all 0.2s ease',
              fontSize: '1rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'var(--primary)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>📋</span> 목록으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
};
