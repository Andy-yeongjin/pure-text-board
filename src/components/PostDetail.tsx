'use client';

import React from 'react';
import { PrivateAuthForm } from './PrivateAuthForm';

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
  const isLocked = post.isPrivate && post.content === null;

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
          padding: isLocked ? '60px 30px' : '40px 30px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          color: '#334155',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isLocked ? 'center' : 'flex-start',
          textAlign: isLocked ? 'center' : 'left'
        }}>
          {isLocked ? (
            <div style={{ width: '100%', maxWidth: '500px' }}>
              <span style={{ fontSize: '4rem', display: 'block', marginBottom: '24px' }}>🔐</span>
              <h2 style={{ color: '#ef4444', fontWeight: '900', fontSize: '1.5rem', margin: '0 0 12px 0' }}>
                비밀글로 보호되고 있습니다.
              </h2>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem', fontWeight: '500' }}>
                게시글 비밀번호를 입력하여 본문을 확인하세요.
              </p>
              <PrivateAuthForm postId={post.id} />
            </div>
          ) : (
            post.content
          )}
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
