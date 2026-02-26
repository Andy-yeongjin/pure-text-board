import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const info = db.prepare(`
      INSERT INTO User (email, password, name, createdAt)
      VALUES (?, ?, ?, datetime('now'))
    `).run(email, hashedPassword, name);

    const user = db.prepare('SELECT id, email, name, createdAt FROM User WHERE id = ?')
      .get(info.lastInsertRowid);

    return NextResponse.json(user);
  } catch (error) {
    console.error('Signup error:', error);
    if ((error as any).code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
