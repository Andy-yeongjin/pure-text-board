'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
  };
}

export const PostForm = ({ initialData }: PostFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = initialData ? 'PATCH' : 'POST';
    const url = initialData ? `/api/posts/${initialData.id}` : '/api/posts';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push(initialData ? `/posts/${initialData.id}` : '/posts');
      router.refresh();
    } else {
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px' }}>
      <input 
        type="text" 
        placeholder="제목" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="본문 (순수 텍스트만 허용)" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        rows={10}
        required 
      />
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
        <button 
          type="submit" 
          style={{ 
            flex: 1, 
            background: 'var(--primary)', 
            color: '#fff', 
            padding: '12px',
            fontSize: '1rem'
          }}
        >
          저장하기
        </button>
        <button 
          type="button" 
          onClick={() => router.push('/posts')}
          style={{ 
            flex: 1, 
            background: '#f1f5f9', 
            color: '#475569', 
            padding: '12px',
            fontSize: '1rem'
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
};
