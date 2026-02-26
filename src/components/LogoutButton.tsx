'use client';

import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // 공통 서버의 로그아웃 API 호출 (모든 쿠키 제거 로직 포함)
    window.location.href = '/api/common/logout';
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
