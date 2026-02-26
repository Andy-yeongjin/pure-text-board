// TEST001/common/server.js
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import next from 'next';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'shared-secret-key'; 
console.log(`> [Shared Server] Using JWT Secret: ${SECRET_KEY.substring(0, 4)}****`);

export default function startSharedServer(projectDir, port = 3000) {
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev, dir: projectDir });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const server = express();

    server.use(helmet({ contentSecurityPolicy: false }));
    server.use(morgan('dev'));
    
    // [중요] Next.js API(/api/) 경로는 Express 파서가 가로채지 않도록 제외
    server.use((req, res, next) => {
      if (req.path.startsWith('/api/') && !req.path.startsWith('/api/common/')) {
        return next();
      }
      express.json()(req, res, next);
    });
    server.use((req, res, next) => {
      if (req.path.startsWith('/api/') && !req.path.startsWith('/api/common/')) {
        return next();
      }
      express.urlencoded({ extended: true })(req, res, next);
    });
    
    server.use(cookieParser());

    // [Constitution 준수] 공통 헬스 체크 API
    server.get('/api/common/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString(), mode: 'Sanity CMS' });
    });

    // [Common] 공통 약관 페이지
    server.get('/terms', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <title>이용약관 | PureText System</title>
          <style>
            :root { --primary: #4f46e5; --primary-hover: #4338ca; --text: #1e293b; --bg: #f8fafc; --card: #ffffff; }
            body { font-family: 'Pretendard', -apple-system, sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; padding: 60px 20px; margin: 0; }
            .card { max-width: 800px; margin: 0 auto; background: var(--card); padding: 50px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }
            h1 { color: var(--text); font-size: 2.2rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 40px; border-bottom: 4px solid var(--primary); display: inline-block; padding-bottom: 8px; }
            h2 { font-size: 1.25rem; margin-top: 40px; font-weight: 700; color: var(--primary); }
            p { color: #475569; margin-bottom: 20px; }
            .footer { margin-top: 50px; text-align: center; color: #94a3b8; font-size: 0.9rem; }
            .btn { display: inline-flex; align-items: center; margin-top: 30px; padding: 12px 28px; background: var(--primary); color: #fff; text-decoration: none; border-radius: 10px; font-weight: 700; transition: background 0.2s; }
            .btn:hover { background: var(--primary-hover); }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>이용약관 및 정책</h1>
            <p>본 서비스는 <strong>PureText 공통 인프라</strong>를 통해 제공되는 통합 커뮤니티 서비스입니다.</p>
            
            <h2>1. 서비스 이용</h2>
            <p>사용자는 본 인프라를 통해 제공되는 모든 게시판 서비스를 자유롭게 이용할 수 있으나, 타인의 권리를 침해하거나 불법적인 콘텐츠를 게시해서는 안 됩니다. 모든 텍스트는 시스템 필터링을 거칠 수 있습니다.</p>

            <h2>2. 개인정보 처리방침</h2>
            <p>회사는 서비스 제공을 위해 최소한의 정보(이메일, 이름)를 수집하며, 모든 비밀번호는 단방향 암호화(bcrypt)되어 안전하게 보관됩니다. 수집된 정보는 서비스 목적 외에 제3자에게 제공되지 않습니다.</p>

            <h2>3. 보안 및 책임</h2>
            <p>비밀글 기능은 세션 기반 쿠키로 보호되나, 공용 PC 사용 시 반드시 로그아웃을 권장합니다. 본 서비스는 프로토타입 상태이며 데이터의 영구 보존을 법적으로 보장하지 않습니다.</p>
            
            <a href="javascript:history.back()" class="btn">← 이전으로 돌아가기</a>
          </div>
          <div class="footer">© 2026 PureText Community System. All rights reserved.</div>
        </body>
        </html>
      `);
    });

    // [Common] 공통 에러 페이지
    server.get('/common-error', (req, res) => {
      const code = req.query.code || '500';
      const msg = req.query.message || '서버 내부 오류가 발생했습니다.';
      res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <title>Error ${code} | PureText System</title>
          <style>
            :root { --primary: #4f46e5; --text: #1e293b; --bg: #f8fafc; }
            body { background: var(--bg); display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Pretendard', sans-serif; margin: 0; color: var(--text); }
            .box { text-align: center; background: #fff; padding: 60px 40px; border-radius: 24px; box-shadow: 0 20px 50px -12px rgb(0 0 0 / 0.15); max-width: 450px; width: 90%; border: 1px solid #e2e8f0; }
            .icon { font-size: 5rem; margin-bottom: 24px; display: block; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1)); }
            h1 { color: #ef4444; margin: 0 0 16px 0; font-size: 4rem; font-weight: 900; letter-spacing: -2px; }
            p { color: #64748b; margin-bottom: 40px; font-size: 1.1rem; line-height: 1.6; }
            .btn { padding: 16px 32px; background: var(--primary); color: #fff; text-decoration: none; border-radius: 12px; font-weight: 800; display: inline-block; transition: transform 0.2s; }
            .btn:hover { transform: translateY(-2px); }
          </style>
        </head>
        <body>
          <div class="box">
            <span class="icon">🚀</span>
            <h1>${code}</h1>
            <p>${msg}</p>
            <a href="/" class="btn">홈으로 돌아가기</a>
          </div>
        </body>
        </html>
      `);
    });

    server.get('/api/common/logout', (req, res) => {
      // 모든 쿠키 확인 후 비밀글 관련 쿠키 제거
      Object.keys(req.cookies).forEach(cookieName => {
        if (cookieName.startsWith('private_access_')) {
          res.clearCookie(cookieName, { path: '/' });
        }
      });
      
      res.clearCookie('auth_token', { path: '/' });
      res.redirect('/login');
    });

    // 인증 미들웨어
    server.use((req, res, next) => {
      // 로그인이 필요 없는 공개 경로 리스트
      const publicPaths = [
        '/', '/login', '/signup', '/terms', '/common-error', '/posts',
        '/api/common/login', '/api/common/status', '/api/common/health',
        '/api/dashboard', '/api/posts' // 대시보드 및 게시글 목록은 공개
      ];
      
      // 정적 파일 및 공개 경로 통과
      if (publicPaths.includes(req.path) || 
          req.path.startsWith('/_next/') || 
          req.path.startsWith('/static/') ||
          req.path.startsWith('/posts/') || 
          req.path.startsWith('/api/posts/') ||
          req.path.startsWith('/api/auth/') // 로그인/회원가입 API 허용
      ) {
        return next();
      }

      const token = req.cookies['auth_token'];
      if (!token) {
        // API 요청인 경우 리다이렉트 대신 401 JSON 반환
        if (req.path.startsWith('/api/')) {
          return res.status(401).json({ error: 'Unauthorized', message: '로그인이 필요합니다.' });
        }
        return res.redirect('/login');
      }

      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
      } catch (err) {
        res.clearCookie('auth_token');
        if (req.path.startsWith('/api/')) {
          return res.status(401).json({ error: 'Unauthorized', message: '세션이 만료되었습니다.' });
        }
        return res.redirect('/common-error?code=401&message=세션이 만료되었습니다. 다시 로그인해주세요.');
      }
    });

    server.all(/.*/, (req, res) => handle(req, res));

    server.listen(port, () => {
      console.log(`\n> [Shared Server] Sanity CMS Mode Active`);
      console.log(`> Local: http://localhost:${port}\n`);
    });
  });
}
