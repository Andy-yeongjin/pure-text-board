import './globals.css';
import Link from 'next/link';
import { getAuthUser } from '@/lib/auth';
import { LogoutButton } from '@/components/LogoutButton';
import { NavBreadcrumb } from '@/components/NavBreadcrumb';

export const metadata = {
  title: '순수 텍스트 게시판',
  description: '보안 강화 텍스트 커뮤니티',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getAuthUser();

  return (
    <html lang="ko">
      <body>
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px 40px', 
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/posts" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
              PureText
            </Link>
            <NavBreadcrumb />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/posts/new" style={{ color: '#334155', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>
              새 글 쓰기
            </Link>
            <div style={{ width: '1px', height: '14px', background: '#e2e8f0' }} />
            {user ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9' }} />
                  <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>{user.name}</span>
                </div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>로그인</Link>
                <Link href="/signup" style={{ 
                  backgroundColor: '#0f172a', 
                  color: '#fff', 
                  padding: '8px 18px', 
                  borderRadius: '20px', 
                  textDecoration: 'none', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}>시작하기</Link>
              </>
            )}
          </div>
        </nav>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
