'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const PrivateAuthForm = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch(`/api/posts/${postId}/verify-password`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh(); // 권한 획득 후 페이지 새로고침하여 본문 표시
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid red', padding: '10px' }}>
      <p>비밀번호를 입력하세요:</p>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">확인</button>
    </form>
  );
};
