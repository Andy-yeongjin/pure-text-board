'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const PrivateAuthForm = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch(`/api/posts/${postId}/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh(); 
      } else {
        alert('비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        display: 'inline-flex', 
        flexDirection: 'column', 
        gap: '12px',
        width: '100%',
        maxWidth: '320px',
        margin: '30px auto 0 auto'
      }}
    >
      <input 
        type="password" 
        placeholder="비밀번호 입력" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        autoFocus
        style={{ 
          width: '100%',
          textAlign: 'center',
          fontSize: '1rem',
          padding: '14px',
          border: '2px solid var(--border-color)',
          borderRadius: '12px',
          boxSizing: 'border-box', // 너비 계산 정확하게
          outline: 'none',
          transition: 'border-color 0.2s',
          backgroundColor: '#fff'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
      />
      <button 
        type="submit" 
        disabled={isLoading}
        style={{ 
          width: '100%',
          padding: '14px', 
          backgroundColor: isLoading ? 'var(--text-muted)' : 'var(--primary)', 
          color: 'white',
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '1rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? '확인 중...' : '잠금 해제'}
      </button>
    </form>
  );
};
