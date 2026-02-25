# Quickstart: Pure Text Board Service

## Prerequisites
- Node.js 20+
- PostgreSQL
- `common/server.js` (Shared Server)

## Setup
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Configure environment**:
   `.env` 파일을 생성하고 다음 변수를 설정합니다.
   ```text
   DATABASE_URL="postgresql://user:password@localhost:5432/pure_text_board"
   PORT=3004
   SHARED_SERVER_PATH="../common/server.js"
   ```
3. **Database Migration**:
   ```bash
   npx prisma migrate dev
   ```

## Development
```bash
npm run dev
```
- 프로젝트는 **Port 3004**에서 실행됩니다.
- `common/server.js`의 인증 미들웨어를 통해 보호됩니다.

## Testing
```bash
# Unit tests
npm test

# Integration tests
npm run test:e2e
```
