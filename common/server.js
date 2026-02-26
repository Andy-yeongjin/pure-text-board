// TEST001/common/server.js
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import next from 'next';
import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3'; 
import bcrypt from 'bcryptjs';
import path from 'path';
import dotenv from 'dotenv'; // dotenv 추가

// .env 파일 로드
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'shared-secret-key'; 
console.log(`> [Shared Server] Using JWT Secret: ${SECRET_KEY.substring(0, 4)}****`);

export default function startSharedServer(projectDir, port = 3000) {
  const dbPath = path.join(projectDir, 'src/db/dev.db');
  const db = new Database(dbPath);

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
      res.json({ status: 'ok', timestamp: new Date().toISOString(), mode: 'SQLite' });
    });

    // [Common] 공통 약관 페이지
    server.get('/terms', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <title>이용약관 | Common Infrastructure</title>
          <style>
            :root { --primary: #4f46e5; --text: #1e293b; --bg: #f8fafc; }
            body { font-family: sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; padding: 40px 20px; }
            .card { max-width: 800px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
            h1 { color: var(--primary); border-bottom: 2px solid var(--bg); padding-bottom: 20px; margin-bottom: 30px; }
            h2 { font-size: 1.2rem; margin-top: 30px; }
            .footer { margin-top: 40px; text-align: center; color: #64748b; font-size: 0.9rem; }
            .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background: var(--primary); color: #fff; text-decoration: none; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>이용약관 및 정책</h1>
            <p>본 서비스는 공통 인프라(Common Infrastructure)를 통해 제공되는 통합 서비스입니다.</p>
            
            <h2>1. 서비스 이용</h2>
            <p>사용자는 본 인프라를 통해 제공되는 모든 게시판 및 커뮤니티 서비스를 자유롭게 이용할 수 있으나, 타인의 권리를 침해하거나 불법적인 콘텐츠를 게시해서는 안 됩니다.</p>

            <h2>2. 개인정보 처리방침</h2>
            <p>회사는 사용자의 이메일과 이름을 서비스 제공 목적으로 수집하며, 이는 암호화되어 안전하게 관리됩니다. 수집된 정보는 법령에 정한 경우를 제외하고 제3자에게 제공되지 않습니다.</p>

            <h2>3. 책임의 한계</h2>
            <p>본 서비스는 프로토타입 상태이며, 데이터의 영구적 보존을 보장하지 않습니다. 중요한 데이터는 반드시 별도로 백업하시기 바랍니다.</p>
            
            <a href="javascript:history.back()" class="btn">이전으로 돌아가기</a>
          </div>
          <div class="footer">© 2026 Common Infrastructure System. All rights reserved.</div>
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
          <title>Error ${code} | Common System</title>
          <style>
            body { background: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; margin: 0; }
            .box { text-align: center; background: #fff; padding: 60px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1); max-width: 400px; }
            .icon { font-size: 4rem; margin-bottom: 20px; display: block; }
            h1 { color: #ef4444; margin: 0 0 10px 0; font-size: 3rem; }
            p { color: #64748b; margin-bottom: 30px; }
            .btn { padding: 12px 24px; background: #4f46e5; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="box">
            <span class="icon">⚠️</span>
            <h1>${code}</h1>
            <p>${msg}</p>
            <a href="/" class="btn">홈으로 돌아가기</a>
          </div>
        </body>
        </html>
      `);
    });

    // 로그인 API
    server.post('/api/common/login', async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = db.prepare('SELECT * FROM User WHERE email = ?').get(email);
        if (user && await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name }, 
            SECRET_KEY, 
            { expiresIn: '1d' }
          );
          res.cookie('auth_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
          res.redirect('/');
        } else {
          res.redirect('/login?error=1');
        }
      } catch (error) {
        console.error('SQLite Login Error:', error);
        res.redirect('/common-error?code=500&message=로그인 처리 중 오류가 발생했습니다.');
      }
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
      console.log(`\n> [Shared Server] Pure SQLite Mode Active`);
      console.log(`> Local: http://localhost:${port}\n`);
    });
  });
}
