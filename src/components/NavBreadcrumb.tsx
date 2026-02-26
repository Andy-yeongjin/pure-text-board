'use client';

import { usePathname } from 'next/navigation';

export const NavBreadcrumb = () => {
  const pathname = usePathname();

  if (!pathname) return null;

  const getLabel = (path: string) => {
    if (path === '/posts') return '목록';
    if (path === '/posts/new') return '새 글 작성';
    if (path.startsWith('/posts/') && path !== '/posts/new') return '게시글 상세';
    if (path === '/login') return '로그인';
    if (path === '/signup') return '회원가입';
    return '';
  };

  const label = getLabel(pathname);

  // '목록'이거나 경로가 없을 때는 표시하지 않음
  if (!label || label === '목록') return null;

  return (
    <span style={{ color: '#94a3b8', marginLeft: '10px', fontSize: '14px', fontWeight: '500' }}>
      <span style={{ margin: '0 8px' }}>&gt;</span>
      {label}
    </span>
  );
};
