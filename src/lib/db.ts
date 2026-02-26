import Database from 'better-sqlite3';
import path from 'path';

// 프로젝트 루트의 .db 파일 경로 (src/db/dev.db)
const DB_PATH = path.join(process.cwd(), 'src/db/dev.db');

// 싱글톤 패턴으로 DB 인스턴스 관리
let db: Database.Database;

if (process.env.NODE_ENV === 'production') {
  db = new Database(DB_PATH);
} else {
  // 개발 환경에서는 HMR(Hot Module Replacement) 시 여러 번 연결되는 것 방지
  if (!(global as any).db) {
    (global as any).db = new Database(DB_PATH);
  }
  db = (global as any).db;
}

// 외래 키 제약 조건 활성화 (기본은 꺼져 있음)
db.pragma('foreign_keys = ON');

export default db;
