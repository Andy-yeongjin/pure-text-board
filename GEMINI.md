# Nodejs Projects (TEST001) Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-26

## Active Technologies
- **Framework**: Next.js 14+ (App Router), Express (Shared Server)
- **Language**: TypeScript
- **Database**: **Pure SQLite (better-sqlite3)** - Prisma 완전히 제거됨
- **Auth**: Centralized JWT (`auth_token`) + Private Post Access Cookies
- **Styling**: Vanilla CSS (Indigo & Clean Card Theme)

## Project Structure
```text
src/
├── app/                 # Next.js App Router
│   ├── page.tsx         # [Redesigned] 미니멀 히어로 섹션 & 통계 대시보드
│   ├── login/           # 프로젝트 전용 Indigo 테마 적용
│   └── signup/          # 프로젝트 전용 Indigo 테마 적용
├── components/          # Shared UI (LikeButton, CommentSection, PrivateAuthForm)
├── db/                  # SQLite Schema & Data
└── common/              # [Common] 테마가 통합된 약관 및 에러 페이지 제공
```

## Recent Changes
- **003-post-view-count**: 조회수 기능 구현 및 Prisma 제거 완료.
- **Home Page Revamp**: 복잡한 목록을 제거하고 본질에 집중한 **히어로 섹션 및 서비스 통계** 중심의 미니멀 디자인 적용.
- **UI/UX Polishing**: 로그인/회원가입 중복 UI 제거, 아바타 규격화, 공통 페이지 테마 통합.
- **Security**: 비밀글 열람 시 댓글 차단 로직 및 로그아웃 시 전체 쿠키 클린업 강화.
- **DX**: 터미널 URL 로깅 및 실시간 DB 확인 도구 환경 구축.
