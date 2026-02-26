# Tasks: Post View Count Visibility & UI/UX Revamp

**Feature**: `003-post-view-count`
**Status**: ALL COMPLETED ✅

## Phase 1: Architecture Migration (Foundational) - COMPLETE

- [x] T000 [ARCH] `better-sqlite3` 패키지 설치 및 `src/lib/db.ts` 싱글톤 인스턴스 생성 (Prisma 대체)
- [x] T001 `src/db/schema.prisma` 파일의 `Post` 모델에 `viewCount` 필드가 존재하고 `Int @default(0)`으로 설정되어 있는지 확인
- [x] T002 [ARCH] 모든 API에서 `PrismaClient`를 제거하고 `better-sqlite3` 기반 순수 SQL 쿼리로 리팩토링
- [x] T003 `src/app/api/posts/[id]/route.ts`의 `GET` 핸들러에서 상세 조회 시 `UPDATE Post SET viewCount = viewCount + 1` 쿼리 실행
- [x] T010 [ARCH] `npm uninstall prisma @prisma/client` 실행 및 `package.json` 스크립트 정리

## Phase 2: UI/UX Implementation (Indigo Theme) - COMPLETE

- [x] T004 [US1] `src/components/PostList.tsx` 각 카드 하단에 조회수(👁) 표시 추가
- [x] T006 [US2] `src/components/LikeButton.tsx` 우측에 조회수 정보를 통합하여 렌더링
- [x] T012 [UI] 로그인(`/login`) 및 회원가입(`/signup`) 페이지 디자인을 Indigo 테마 카드로 리모델링
- [x] T013 [UI] `CommentSection.tsx` 리팩토링 (아바타 추가 및 인디고 테마 적용)
- [x] T014 [UI] 비밀글 비밀번호 입력창(`PrivateAuthForm`)을 본문 영역으로 이동 및 정렬 최적화

## Phase 3: Security & DX Improvements - COMPLETE

- [x] T015 [SEC] 서버 컴포넌트 `fetch` 시 쿠키를 전달하도록 수정하여 비밀글 권한 체크 정상화
- [x] T016 [SEC] 비밀글 조회 시 본문뿐만 아니라 댓글 목록도 숨기도록 보안 강화
- [x] T017 [SEC] 로그아웃 시 모든 비밀글 권한 쿠키(`private_access_*`)를 싹 지우도록 로직 강화
- [x] T018 [DX] `common/server.js`에서 서버 시작 시 접속 URL이 터미널에 출력되도록 개선
- [x] T019 [DX] `check-db.js` 스크립트 생성으로 실시간 DB 데이터 확인 지원

## Final Phase: Polish & Quality - COMPLETE

- [x] T008 전체 서비스 반응형 레이아웃 및 디자인 일관성 최종 점검
- [x] T009 `src/db/seed.js`를 `better-sqlite3` 방식으로 리팩토링하여 테스트 데이터 확보
- [x] T020 공통 서버에 `/terms` 및 `/common-error` 페이지 추가 및 예외 경로 등록
