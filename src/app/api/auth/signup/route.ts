import { NextResponse } from 'next/server';
import { client, writeClient } from '@/lib/sanity';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // 중복 이메일 확인
    const existing = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await writeClient.create({
      _type: 'user',
      email,
      password: hashedPassword,
      name
    });

    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
