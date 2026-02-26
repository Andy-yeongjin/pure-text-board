import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'dev.db');
const db = new Database(dbPath);

async function main() {
  console.log('--- Starting Seed (SQLite Mode) ---');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // User 테이블 초기 데이터 (없을 때만 삽입)
  const existingUser = db.prepare('SELECT id FROM User WHERE email = ?').get('test@example.com');
  
  if (!existingUser) {
    const info = db.prepare(`
      INSERT INTO User (email, password, name, createdAt)
      VALUES (?, ?, ?, datetime('now'))
    `).run('test@example.com', hashedPassword, '테스트유저');
    
    console.log('✅ Created test user:', info.lastInsertRowid);
  } else {
    console.log('ℹ️ Test user already exists.');
  }

  console.log('--- Seed Finished ---');
}

main().catch(console.error);
