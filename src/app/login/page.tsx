'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NavBreadcrumb } from '@/components/NavBreadcrumb';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/posts');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <NavBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Login' }]} />
      
      <div className="card" style={{ maxWidth: '440px', margin: '40px auto', width: '100%' }}>
        <div style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}>🔐</span>
            <h1 style={{ fontSize: '2rem', margin: '0 0 12px 0', color: 'var(--text-main)', fontWeight: '800' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>서비스 이용을 위해 로그인해주세요.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>이메일 주소</label>
              <input 
                type="email" 
                placeholder="example@mail.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ padding: '12px 16px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>비밀번호</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ padding: '12px 16px' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              style={{ 
                padding: '14px', 
                backgroundColor: isLoading ? 'var(--text-muted)' : 'var(--primary)', 
                color: 'white',
                fontSize: '1rem',
                marginTop: '10px'
              }}
              onMouseOver={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
              }}
              onMouseOut={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--primary)';
              }}
            >
              {isLoading ? '로그인 중...' : '로그인하기'}
            </button>
          </form>

          <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              아직 계정이 없으신가요? 
              <Link href="/signup" style={{ marginLeft: '8px', color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
