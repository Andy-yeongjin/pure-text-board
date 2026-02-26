# Implementation Plan: Home Page Dashboard

**지침: 모든 계획서 내용은 반드시 한글로 작성합니다.**

**Branch**: `002-home-page` | **Status**: Completed (2026-02-26)

## 1. 개요 (Overview)
본 계획서는 서비스의 첫 관문인 메인 화면(Landing Page)을 구축하기 위한 기술 설계 및 구현 절차를 기술함.

---

## 2. 기술적 맥락 (Technical Context)

- **Next.js 14 App Router**: `/src/app/page.tsx`를 메인 진입점으로 설정.
- **Prisma Integration**: 서비스 통계 및 게시물 프리뷰 데이터를 위한 ORM 활용.
- **Vanilla CSS**: 미니멀리즘 디자인 컨셉 구현을 위한 순수 CSS 스타일링.
- **Auth Compatibility**: `common/server.js`의 JWT 인증 기반 사용자 상태 대응.

---

## 3. 헌장 준수 (Constitution Check)

- **I. Shared Server**: `npm run dev` 실행 시 `common/server.js` 기반 서버 기동 확인.
- **II. SDD**: `/speckit.specify`를 통한 사양 정의 완료 및 본 설계서 작성을 통한 SDD 준수.
- **V. UX Consistency**: "Pure Text" 아이덴티티를 유지하는 미니멀리즘 디자인 가이드 준수.
- **VI. Centralized Auth**: 기존 로그인/회원가입 경로 유지 및 인증 상태에 따른 CTA 분기 처리.
- **VII. Port Management**: `GEMINI.md`에 정의된 포트 `3004` 사용.

---

## 4. 구현 단계 (Implementation Phases)

### 4.1 Phase 0: 리서치 및 기초 설계 (Research & Design)
- [x] 서비스 통계 집계 방식 결정 (Prisma `count()`)
- [x] 인기 게시물 산출 로직 설계 (`likes` 집계 기반)
- [x] 메인 화면 레이아웃 및 스타일 가이드 확립

### 4.2 Phase 1: 데이터 모델 및 계약 (Model & Contracts)
- [x] `data-model.md` 작성 (기존 모델 활용 방안)
- [x] `contracts/api.md` 작성 (대시보드 전용 API 정의)
- [x] `quickstart.md` 작성 (빠른 시작 및 검증 가이드)

### 4.3 Phase 2: 대시보드 API 구현 (API Implementation)
- **API Endpoint**: `src/app/api/dashboard/route.ts` 신규 생성.
- **Logic**: 
    - 공개된 전체 게시글 수 및 전체 사용자 수 집계.
    - 최신순 게시물 5개 추출 (비밀글 제외).
    - 좋아요 순 게시물 5개 추출 (비밀글 제외).
- **Security**: 응답 데이터에서 본문(`content`) 및 비밀번호 필드 명시적 제외.

### 4.4 Phase 3: 메인 화면 UI 구현 (UI Implementation)
- **Component**: `src/app/page.tsx` 수정 (기존 리다이렉트나 빈 페이지 대체).
- **Layout**:
    - Hero Section (서비스 타이틀 및 소개).
    - Stats Section (실시간 통계 수치 표시).
    - Content Preview (최근/인기 게시물 목록 렌더링).
- **CTA**: 로그인 상태에 따라 버튼(로그인/회원가입 vs 글쓰기/목록보기) 분기 처리.
- **Styling**: `src/app/globals.css` 또는 전용 CSS 모듈 활용.

### 4.5 Phase 4: 통합 및 검증 (Integration & Validation)
- 브라우저를 통한 메인 화면 렌더링 및 데이터 정합성 확인.
- 로그인/비로그인 상태에 따른 CTA 동작 및 리스트 필터링(비밀글 제외) 검증.
- 모바일 반응형 레이아웃 최종 점검.

---

## 5. 승인 게이트 (Approval Gates)

- **디자인 게이트**: 비밀글이 메인 화면 목록에 노출되지 않는지 기술적으로 보장함 (Prisma `where` 조건 강제).
- **성능 게이트**: 복잡한 Join 연산을 지양하고 집계 쿼리를 최적화하여 1.5초 이내의 로딩 속도 유지.
- **보안 게이트**: 메인 화면 API에서 본문 데이터가 유출되지 않도록 스키마 필터링 적용.
