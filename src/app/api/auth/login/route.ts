import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// .env 또는 기본 시크릿 키 사용
const JWT_SECRET = process.env.JWT_SECRET || 'shared-secret-key'; 
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = db.prepare('SELECT * FROM User WHERE email = ?').get(email) as any;
    
    if (!user) {
      console.log(`Login failed: User not found (${email})`);
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log(`Login failed: Invalid password for ${email}`);
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name }, 
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email } 
    });

    // 쿠키 설정 (보안 옵션 확인)
    response.cookies.set('auth_token', token, { 
      httpOnly: true, 
      path: '/', 
      maxAge: 24 * 60 * 60,
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
