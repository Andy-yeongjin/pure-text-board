# Tasks: Home Page Dashboard (002-home-page)

**지침: 모든 작업 리스트와 설명은 반드시 한글로 작성합니다.**

**Input**: Design documents from `/specs/002-home-page/`
**Status**: Completed (2026-02-26)

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and API development for dashboard data.

- [x] T001 [P] Create Dashboard API route structure in `src/app/api/dashboard/route.ts`
- [x] T002 Implement service statistics logic (User/Post counts) in `src/app/api/dashboard/route.ts`
- [x] T003 Implement recent posts logic (Top 5 public posts) in `src/app/api/dashboard/route.ts`
- [x] T004 Implement popular posts logic (Top 5 by likes, public only) in `src/app/api/dashboard/route.ts`
- [x] T005 [P] Add error handling and response schema validation for the dashboard API

**Checkpoint**: API is functional and can be verified via `GET /api/dashboard`.

---

## Phase 2: User Story 1 - 서비스 대시보드 UI (Priority: P1) 🎯 MVP

**Goal**: 사용자가 메인 화면에서 서비스의 전체 현황과 최신/인기 게시물을 한눈에 확인할 수 있음.

- [x] T006 [P] Create main page component in `src/app/page.tsx` (Replace existing content)
- [x] T007 Implement Hero Section with "Pure Text Board" branding
- [x] T008 Implement Stats Section to display total posts and users from API
- [x] T009 [P] Create Recent Posts list component and integrate with dashboard data
- [x] T010 [P] Create Popular Posts list component and integrate with dashboard data
- [x] T011 Apply Vanilla CSS styling for minimalist design in `src/app/globals.css`

**Checkpoint**: 메인 화면에서 기본적인 대시보드 정보가 시각적으로 노출됨.

---

## Phase 3: User Story 2 - 상태별 CTA 및 네비게이션 (Priority: P2)

**Goal**: 로그인 상태에 따라 사용자에게 적절한 행동(글쓰기 vs 로그인)을 유도함.

- [x] T012 [P] Integrate `lib/auth.ts` to check user session in `src/app/page.tsx`
- [x] T013 Implement conditional rendering for Guest CTA (Signup/Login buttons)
- [x] T014 Implement conditional rendering for Member CTA (New Post/View List buttons)
- [x] T015 Add personalized welcome message for logged-in users

**Checkpoint**: 사용자의 인증 상태에 맞는 최적화된 메인 화면 경험 제공.

---

## Phase 4: Polish & Validation

**Purpose**: 최종 품질 점검 및 사양 준수 확인.

- [x] T016 [P] Verify that private posts are strictly excluded from all dashboard lists
- [x] T017 Ensure mobile responsiveness for the dashboard layout
- [x] T018 Run `quickstart.md` validation steps
- [x] T019 Final code cleanup and removal of any redundant boilerplate in `src/app/page.tsx`
