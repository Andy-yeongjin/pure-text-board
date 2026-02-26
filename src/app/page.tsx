import Link from 'next/link';

async function getDashboardData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004'}/api/dashboard`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      {/* 히어로 섹션 */}
      <section style={{ maxWidth: '800px', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-2px', marginBottom: '24px', lineHeight: 1.1 }}>
          The Purest Text <br />
          <span style={{ color: 'var(--primary)' }}>Community.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '40px' }}>
          불필요한 장식은 덜어내고 소통의 본질만 남겼습니다.<br />
          비밀번호로 지켜지는 프라이빗한 이야기부터 스마트한 인사이트까지.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/posts" style={{ 
            padding: '16px 32px', 
            backgroundColor: 'var(--primary)', 
            color: 'white', 
            borderRadius: '14px', 
            textDecoration: 'none', 
            fontWeight: '800',
            fontSize: '1.1rem',
            boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
          }}>
            게시글 둘러보기
          </Link>
          <Link href="/posts/new" style={{ 
            padding: '16px 32px', 
            backgroundColor: 'white', 
            color: 'var(--text-main)', 
            border: '2px solid var(--border-color)',
            borderRadius: '14px', 
            textDecoration: 'none', 
            fontWeight: '700',
            fontSize: '1.1rem'
          }}>
            새 글 쓰기
          </Link>
        </div>
      </section>

      {/* 심플 통계 섹션 */}
      {data && (
        <section style={{ display: 'flex', gap: '80px', padding: '40px 80px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Posts</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>{data.stats.totalPublicPosts}</div>
          </div>
          <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Users</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>{data.stats.totalUsers}</div>
          </div>
        </section>
      )}

      {/* 푸터 보조 링크 */}
      <div style={{ marginTop: '60px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginRight: '20px' }}>이용약관</Link>
        <span>© 2026 PureText System</span>
      </div>
    </main>
  );
}
