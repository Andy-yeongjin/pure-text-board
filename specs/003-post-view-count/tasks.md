# Tasks: Post View Count Visibility & UI/UX Revamp

**Feature**: `003-post-view-count`
**Status**: ALL COMPLETED ✅ (Full History Restored)

## Phase 1: Architecture Migration (Foundational) - COMPLETE

- [x] T000 [ARCH] `better-sqlite3` 패키지 설치 및 `src/lib/db.ts` 싱글톤 인스턴스 생성
- [x] T001 `src/db/schema.prisma` 파일의 `Post` 모델 내 `viewCount` 필드 존재 여부 재확인
- [x] T002 [ARCH] 모든 API 라우트에서 `PrismaClient` 제거 및 순수 SQL 쿼리로 리팩토링
- [x] T003 `src/app/api/posts/[id]/route.ts`의 `GET` 핸들러 내 조회수 원자적 증가 로직 반영
- [x] T010 [ARCH] Prisma 관련 패키지 삭제 및 `package.json` 스크립트(db:seed 등) 정리

## Phase 2: User Story & UI/UX Revamp - COMPLETE

- [x] T004 [US1] `src/components/PostList.tsx` 카드 하단에 조회수(👁) 표시 추가
- [x] T005 [US1] 조회수 아이콘과 텍스트 사이의 간격 및 정렬 스타일링 (Vanilla CSS)
- [x] T006 [US2] `src/components/LikeButton.tsx` 내부에 조회수 정보 통합 렌더링
- [x] T007 [US2] 상세 페이지 상호작용 영역(Flexbox) 레이아웃 최적화
- [x] T012 [UI] 로그인 및 회원가입 페이지 디자인 Indigo 테마로 전면 리모델링
- [x] T013 [UI] `CommentSection.tsx` 리팩토링 (DiceBear 아바타 및 테마 적용)
- [x] T014 [UI] 비밀번호 입력창(`PrivateAuthForm`)을 본문 영역으로 이동 및 중앙 정렬
- [x] T021 [UI] 메인화면 리모델링 (최근/인기 목록 제거 및 히어로 섹션 강화)
- [x] T022 [UI] 메인 히어로 설명 문구 수정 (본질 중심의 3번 옵션 적용)

## Phase 3: Security & DX Improvements - COMPLETE

- [x] T011 [DX] `common/server.js` 서버 시작 시 접속 URL(`http://localhost:3004`) 출력 기능 추가
- [x] T015 [SEC] 서버 컴포넌트 `fetch` 호출 시 브라우저 쿠키 전달 로직 구현 (Auth Forwarding)
- [x] T016 [SEC] 비밀글 조회 시 본문뿐만 아니라 댓글 목록도 은폐하도록 보안 강화
- [x] T017 [SEC] 로그아웃 시 모든 비밀글 권한 쿠키(`private_access_*`) 삭제 로직 추가
- [x] T018 [DX] `.env` 환경 변수(JWT_SECRET)를 공통 서버와 완벽하게 공유하도록 설정
- [x] T019 [DX] Express Body-parser가 Next.js API 요청을 가로채지 않도록 미들웨어 수정
- [x] T020 [Common] 공통 서버에 디자인 폴리싱된 `/terms` 및 `/common-error` 페이지 추가

## Final Phase: Polish & Quality - COMPLETE

- [x] T008 전체 서비스 반응형 레이아웃 및 디자인 일관성 최종 점검 (체크리스트 기반)
- [x] T009 `src/db/seed.js`를 `better-sqlite3` 방식으로 리팩토링하여 테스트 데이터 시딩 확인
