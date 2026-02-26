# Requirement Quality Checklist: UI Consistency & Security

**Purpose**: "Unit Tests for English" - 요구사항 명세서의 품질, 명확성 및 완전성을 검증함.
**Feature**: `003-post-view-count` (Architecture & UI/UX Revamp)
**Created**: 2026-02-26
**Target Audience**: Developer (Post-Implementation Re-verification)

## 1. UI/UX 요구사항 일관성 (Theme System Consistency) - COMPLETE

- [x] CHK001 - 모든 페이지(로그인, 가입, 게시판)에서 'Indigo' 테마 변수(`--primary`) 사용 규칙이 명시적으로 정의되었는가? [Consistency, Plan §Technical Context]
- [x] CHK002 - 공통 서버가 제공하는 `/terms` 및 `/common-error` 페이지의 시각적 요소가 프로젝트 전용 페이지와 조화를 이루도록 스타일 가이드가 문서화되었는가? [Gap, Spec §SC-001]
- [x] CHK003 - `LikeButton`과 `viewCount` 통합 렌더링 시, 아이콘과 숫자 간의 간격(gap) 및 정렬 방식이 구체적인 수치(px)로 정의되었는가? [Clarity, Spec §FR-003]
- [x] CHK004 - 게시글 카드와 댓글 섹션에서 사용되는 아바타(`DiceBear`)의 규격 및 배경색 규칙이 일관되게 명세되었는가? [Consistency, Gap]
- [x] CHK005 - 비밀번호 입력창(`PrivateAuthForm`)이 본문 영역으로 이동함에 따른 중앙 정렬 및 최대 너비(max-width) 제약 사항이 명확히 기술되었는가? [Clarity, Spec §SC-001]

## 2. 통합 보안 명세 품질 (Security & Auth Requirements) - COMPLETE

- [x] CHK006 - 비밀글 열람 권한 판단 시 "작성자 본인" 여부와 "비밀번호 쿠키" 소유 여부에 대한 우선순위가 명확히 정의되었는가? [Clarity, Spec §FR-005]
- [x] CHK007 - 권한이 없는 사용자가 비밀글 접근 시, 본문뿐만 아니라 **댓글 목록**까지 완전히 은폐해야 한다는 보안 요구사항이 구체적으로 명시되었는가? [Completeness, Spec §SC-002]
- [x] CHK008 - 로그아웃 시 삭제해야 할 쿠키 목록에 `private_access_*` 와일드카드 패턴이 보안 정책으로 포함되었는가? [Completeness, Spec §FR-005]
- [x] CHK009 - 서버 컴포넌트(Server-side fetch) 호출 시 인증 쿠키를 수동으로 전달해야 한다는 기술적 제약 사항이 설계에 반영되었는가? [Traceability, Research §D4]
- [x] CHK010 - 로그인 API(/api/auth/*)가 공통 서버의 인증 미들웨어를 통과하기 위한 예외 경로(publicPaths) 규칙이 문서화되었는가? [Completeness, Plan §Structure]

## 3. 예외 케이스 및 데이터 무결성 명세 (Edge Case & Integrity) - COMPLETE

- [x] CHK011 - 조회수 증가(`UPDATE`)가 실패하거나 지연될 경우의 사용자 피드백 요구사항이 정의되었는가? [Gap, Exception Flow]
- [x] CHK012 - Prisma 제거 후 순수 SQLite(`better-sqlite3`) 사용 시 발생할 수 있는 동시성(Race Condition)에 대한 방어 로직이 설계에 포함되었는가? [Coverage, Research §D2]
- [x] CHK013 - 비밀번호가 틀렸을 때의 재시도 횟수 제한이나 오류 메시지 노출 규칙이 명확히 규정되었는가? [Clarity, Gap]

---

### 💡 리포트 및 안내
- **상태**: 모든 요구사항 품질 항목이 `spec.md` 및 `plan.md`에 충실히 반영되었습니다. 
- **결과**: 문서의 품질이 "구현 가능" 단계를 넘어 "유지보수 및 보안 검증 가능" 수준으로 향상되었습니다. 
- **다음 단계**: 코드 정밀 튜닝(Final Polish)을 통해 문서의 기준과 실제 구현을 100% 일치시킵니다. 
