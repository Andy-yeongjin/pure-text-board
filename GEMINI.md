# Nodejs Projects (TEST001) Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-26

## Active Technologies
- **Framework**: Next.js 14+ (App Router), Express (Shared Server)
- **Language**: TypeScript
- **Database**: **Pure SQLite (better-sqlite3)** - Prisma 완전히 제거됨
- **Auth**: Centralized JWT (`auth_token`) + Private Post Access Cookies
- **Testing**: Jest, Playwright
- **Styling**: Vanilla CSS (Indigo & Clean Card Theme)

## Project Structure
```text
src/
├── app/                 # Next.js App Router
├── components/          # Shared UI (LikeButton, CommentSection 리팩토링 완료)
├── db/                  # SQLite Schema & Data (기존 prisma 폴더에서 변경)
│   ├── dev.db           # 메인 데이터베이스
│   ├── schema.prisma    # 문서용 스키마 기록
│   └── seed.js          # SQL 기반 초기 데이터 생성
├── lib/                 # Core logic (db.ts 싱글톤, auth 쿠키 처리)
└── tests/               # Unit and Integration tests
```

## Commands
- `npm run dev`: Start development server (Port 3004, URL 로깅 지원)
- `node src/db/seed.js`: Run database seeding (Pure SQL)
- `node check-db.js`: 현재 DB 데이터 실시간 확인 스크립트
- `npm test`: Run unit tests (Jest)

## Code Style & Architecture
- **Pure SQLite Mode**: 모든 API는 `better-sqlite3`를 사용하여 직접 SQL 쿼리를 수행함.
- **UI Consistency**: 모든 페이지는 `Indigo` 테마와 `card` 레이아웃을 준수함.
- **Security**: 비밀글은 작성자 본인 확인 및 `private_access_*` 쿠키를 통한 2중 보안 적용.

## Recent Changes
- **001-pure-text-board**: Initial implementation.
- **002-home-page**: Implementation of Home Page Dashboard.
- **003-post-view-count**: 조회수 기능 구현 및 **Prisma 제거(Pure SQLite 전환)** 완료.
- **UI/UX Revamp**: 로그인/회원가입/댓글 섹션 디자인 통일 및 비밀글 보안 로직 강화.
- **DX Improvements**: 서버 시작 시 터미널에 접속 URL 출력 기능 추가.
