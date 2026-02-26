# Nodejs Projects (TEST001) Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-26

## Active Technologies
- **Framework**: Next.js 14+ (App Router), Express (Shared Server)
- **Language**: TypeScript
- **Database**: **Sanity CMS** (SQLite 완전 제거 완료)
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
├── db/                  # Sanity Schema & Config
└── common/              # [Common] 테마가 통합된 약관 및 에러 페이지 제공
```

## Recent Changes
- **Real-time Data & Cache Invalidation (2026-02-26)**: 대시보드 통계 실시간 반영을 위한 `force-dynamic` 설정 및 게시글 작성 시 목록/메인 캐시 무효화(`revalidatePath`) 로직 추가.
- **Vercel Deployment (2026-02-26)**: Vercel CLI를 통한 프로젝트 연동, 환경 변수 자동화 설정 및 프로덕션 배포 완료.
- **UI Stability Fix (2026-02-26)**: `NavBreadcrumb` 컴포넌트에서 `usePathname()`이 `null`을 반환할 때 발생하는 런타임 오류 해결.
- **Home Page Revamp**: 본질에 집중한 히어로 섹션 및 서비스 통계 중심의 미니멀 디자인 적용.
