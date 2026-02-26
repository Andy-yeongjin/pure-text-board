# Tasks: Sanity CMS Data Store Integration (Refined)

**Feature**: `004-sanity-cms`
**Status**: Re-designed for Consistency ✅

## Phase 1: Setup & Schema

- [x] T001 Sanity 프로젝트 생성 및 환경 변수(`.env`) 설정
- [x] T002 `npm install next-sanity @sanity/client` 패키지 설치
- [x] T003 `src/db/sanity/schema/`에 Post, User, Comment, Like 스키마 정의
- [x] T004 `src/lib/sanity.ts` 싱글톤 클라이언트 구현 (Write 권한 포함)

## Phase 2: System-wide Type Refactoring (CRITICAL) - COMPLETE

- [x] T005 [P] 모든 API 라우트(`params.id`)의 ID 타입을 `number`에서 `string`으로 변경 및 `parseInt` 제거
- [x] T006 [P] 프론트엔드 인터페이스(Post, Comment 등)의 `id` 속성 타입을 `string`으로 업데이트
- [x] T007 게시글 작성 및 댓글 작성 UI에서 '비밀글' 관련 필드 및 로직 완전 제거

## Phase 3: Content Management & Data Seeding - COMPLETE (Config Ready)

- [x] T008 Sanity Studio 설정(`sanity.config.ts`) 완료 및 실행 준비
- [x] T009 [US1] Sanity Studio 가이드 제공 (사용자가 직접 데이터를 입력해야 함)

## Phase 4: Website Integration (Sanity API) - COMPLETE

- [x] T010 [US2] `GET /api/posts` 목록 조회를 GROQ 쿼리로 전환 (관계 데이터 포함)
- [x] T011 [US2] `GET /api/posts/[id]` 상세 조회 및 `patch().inc()` 조회수 증가 로직 구현
- [x] T012 [US2] `POST /api/comments` 및 댓글 삭제 로직을 Sanity Client로 전환
- [x] T013 [US2] 좋아요 토글 및 카운트 조회를 Sanity API 기반으로 재구현
- [x] T014 [US2] 로그인 API(`/api/auth/login`)에서 Sanity 유저 데이터를 사용하여 인증 수행

## Final Phase: Cleanup & Build Polish - COMPLETE ✅

- [x] T015 [ARCH] `better-sqlite3` 패키지 및 `src/lib/db.ts` 참조 완전 제거
- [x] T016 `src/db/dev.db` 파일 및 SQLite 관련 잔재 정리 (일부 파일은 재부팅 후 삭제 권장)
- [x] T017 [BUG] `@playwright/test` 설치 및 `playwright.config.ts` 타입 오류 해결
- [x] T018 [BUG] `jsonwebtoken`, `cookie` 등 라이브러리의 TypeScript 타입 패키지(@types/*) 설치
- [x] T019 [BUG] `NavBreadcrumb`의 `usePathname` null 참조 오류 해결 (UI 안정성 확보)
- [x] T020 [FEAT] `revalidatePath` 및 `force-dynamic` 적용 (실시간 통계 및 목록 즉시 반영)
- [x] T021 [BUG] Sanity CDN 엣지 캐시 비활성화(`useCdn: false`) 및 전역 캐시 갱신(`layout`)을 통한 데이터 딜레이 해결
- [x] T022 [FEAT] Vercel 연동 및 환경 변수 클라우드 설정 완료 (Production 배포)
- [x] T023 `npm run build`를 통한 전체 프로젝트 빌드 무결성 확인
- [x] T024 Jest 유닛 테스트 및 Playwright 통합 테스트 실행 확인
- [x] T025 전체 서비스 통합 테스트 및 Vercel 배포 준비 완료 가이드 업데이트
