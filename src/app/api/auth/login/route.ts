import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'shared-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Sanity에서 사용자 조회
    const user = await client.fetch(`
      *[_type == "user" && email == $email][0]
    `, { email });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name }, 
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ 
      success: true, 
      user: { id: user._id, name: user.name, email: user.email } 
    });

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
