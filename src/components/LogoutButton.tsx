'use client';

import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      router.push('/login');
      router.refresh(); // 페이지를 새로고침하여 레이아웃의 상태 업데이트
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      style={{ 
        background: 'none', 
        border: 'none', 
        color: '#64748b', 
        cursor: 'pointer', 
        textDecoration: 'underline',
        padding: 0
      }}
    >
      로그아웃
    </button>
  );
};
