# Tasks: Pure Text Board Service

**Input**: Design documents from `specs/001-pure-text-board/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/api.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base structure

- [x] T001 Create src/ directory structure per implementation plan
- [x] T002 Initialize Next.js 14 project with TypeScript in src/
- [x] T003 [P] Configure Prisma with PostgreSQL provider in src/prisma/schema.prisma
- [x] T004 [P] Configure Vanilla CSS for global styling in src/app/globals.css
- [x] T005 Setup Express proxy integration with `common/server.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure required for all user stories

- [x] T006 Implement User entity in src/prisma/schema.prisma
- [x] T007 Implement Post entity with `isPrivate` and `privatePw` in src/prisma/schema.prisma
- [x] T008 [P] Setup Centralized Authentication middleware (JWT) in src/lib/auth.ts
- [x] T009 [P] Create Plain Text filtering utility (striptags) in src/lib/text-filter.ts
- [x] T010 Run initial Prisma migration to setup database tables
- [x] T010a Setup Jest and Playwright configuration in src/

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Guest Browsing (Priority: P1) 🎯 MVP

**Goal**: Enable non-logged in users to list and view public posts

**Independent Test**: Verify guest can see post list and view non-private post content without login

### Tests for User Story 1

- [x] T017a [P] [US1] Write unit tests for privacy filtering in src/tests/unit/text-filter.test.ts
- [x] T017b [P] [US1] Write E2E test for guest browsing in src/tests/integration/guest-browsing.spec.ts

### Implementation for User Story 1

- [x] T011 [P] [US1] Create Post list component in src/components/PostList.tsx
- [x] T012 [P] [US1] Create Post detail component in src/components/PostDetail.tsx
- [x] T013 [US1] Implement GET /api/posts endpoint in src/app/api/posts/route.ts
- [x] T014 [US1] Implement GET /api/posts/:id endpoint with privacy check in src/app/api/posts/[id]/route.ts
- [x] T015 [US1] Create Post list page in src/app/posts/page.tsx
- [x] T016 [US1] Create Post detail page with view count logic in src/app/posts/[id]/page.tsx
- [x] T017 [US1] Implement redirection to login for private posts in middleware

**Checkpoint**: User Story 1 functional - Guests can browse public content

---

## Phase 4: User Story 2 - Member Interaction & Secret Posts (Priority: P2)

**Goal**: Enable logged-in users to create posts and handle private post access

**Independent Test**: Logged in user creates a private post; another user must enter password to view

### Tests for User Story 2

- [x] T023a [P] [US2] Write unit tests for password verification logic in src/tests/unit/auth.test.ts
- [x] T023b [P] [US2] Write E2E test for private post creation and access in src/tests/integration/secret-posts.spec.ts

### Implementation for User Story 2

- [x] T018 [P] [US2] Create Post creation form with private toggle in src/components/PostForm.tsx
- [x] T019 [P] [US2] Create Private password entry form in src/components/PrivateAuthForm.tsx
- [x] T020 [US2] Implement POST /api/posts endpoint with text filtering in src/app/api/posts/route.ts
- [x] T021 [US2] Implement POST /api/posts/:id/verify-password in src/app/api/posts/[id]/verify-password/route.ts
- [x] T022 [US2] Create Post creation page in src/app/posts/new/page.tsx
- [x] T023 [US2] Integrate password form into Post detail page for private content

**Checkpoint**: User Story 2 functional - Private posts are secured and members can contribute

---

## Phase 5: User Story 3 - Social Interactions (Priority: P3)

**Goal**: Implement Likes (unique per user/post) and Comments (soft delete)

**Independent Test**: Toggle like multiple times (count changes 0<->1); Delete comment and see "삭제된 댓글입니다"

### Tests for User Story 3

- [x] T029a [P] [US3] Write integration tests for Like toggle and Comment soft delete
- [x] T029b [P] [US3] Write E2E test for full social interaction flow

### Implementation for User Story 3

- [x] T024 [P] [US3] Add Comment and Like entities to src/prisma/schema.prisma
- [x] T025 [P] [US3] Create Comment list/form component in src/components/CommentSection.tsx
- [x] T026 [P] [US3] Create Like toggle button component in src/components/LikeButton.tsx
- [x] T027 [US3] Implement POST /api/posts/:id/like (Toggle logic) in src/app/api/posts/[id]/like/route.ts
- [x] T028 [US3] Implement POST /api/comments and DELETE /api/comments/:id (Soft delete) in src/app/api/comments/route.ts
- [x] T029 [US3] Update Post detail page to include Likes and Comments

**Checkpoint**: User Story 3 functional - Full social interaction features complete

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T030 [P] Apply Vanilla CSS styling for consistent UI across all pages
- [x] T031 Implement global error handling (ERROR_PAGE_HTML)
- [x] T032 [P] Final audit for any HTML/Image leaks in text rendering
- [x] T033 Run quickstart.md validation to ensure setup works for others

---

## Dependencies & Execution Order

1. **Phase 1 & 2** are mandatory prerequisites.
2. **Phase 3 (US1)** is the MVP and should be completed first.
3. **Phase 4 (US2)** depends on US1 list/detail structure.
4. **Phase 5 (US3)** depends on US1 detail page for integration.

## Parallel Execution Examples

- **Setup**: T003, T004 can run in parallel.
- **Foundational**: T008, T009 can run in parallel.
- **User Story 1**: T011, T012 can run in parallel.
- **User Story 2**: T018, T019 can run in parallel.
- **User Story 3**: T024, T025, T026 can run in parallel.

## Implementation Strategy

1. **MVP First**: Complete through Phase 3. This provides a functional board where users can read content.
2. **Incremental Delivery**: Add Phase 4 for contribution, then Phase 5 for engagement.
3. **Validation**: Each user story must pass its "Independent Test" criteria before starting the next phase.
