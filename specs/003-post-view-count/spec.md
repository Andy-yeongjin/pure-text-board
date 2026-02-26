# Feature Specification: Post View Count Visibility

**Feature Branch**: `003-post-view-count`  
**Created**: 2026-02-26  
**Status**: Implemented (완료)
**Input**: User description: "Add view count to post cards in the feed and next to the like button in the detail page."

## User Scenarios & Testing

### User Story 1 - View Count in Feed (Priority: P1)
- **Status**: ✅ 구현 완료
- **Independent Test**: `/posts` 페이지 카드 하단에 `👁 {조회수}` 표시 확인.

### User Story 2 - View Count in Detail Page (Priority: P2)
- **Status**: ✅ 구현 완료
- **Independent Test**: 상세 페이지 내 `LikeButton` 우측에 조회수 통합 표시 및 새로고침 시 증가 확인.

### User Story 3 - UI/UX Consistency (Priority: P2)
- **Goal**: 로그인, 회원가입, 댓글 영역의 디자인을 Indigo 테마로 통일.
- **Status**: ✅ 구현 완료

### User Story 4 - Private Post Security (Priority: P1)
- **Goal**: 작성자 본인 확인 및 쿠키 기반의 철저한 본문 보호.
- **Status**: ✅ 구현 완료

## Requirements

### Functional Requirements
- **FR-001**: `PostList` 컴포넌트 각 카드에 `viewCount` 표시.
- **FR-002**: `LikeButton` 컴포넌트 옆에 `viewCount` 통합 표시.
- **FR-003**: 상세 페이지 진입 시 조회수 원자적 증가 로직 적용.
- **FR-004**: **Pure SQLite (better-sqlite3)** 기반 데이터 처리 및 Prisma 제거.
- **FR-005**: 로그아웃 시 비밀글 권한 쿠키(`private_access_*`) 전체 삭제.

## Success Criteria
- **SC-001**: 전 페이지의 디자인 톤앤매너 일관성 유지.
- **SC-002**: 비회원의 게시글 목록/상세 접근 허용 및 비밀글 보호 로직 정상 작동.
- **SC-003**: 서버 시작 시 터미널에 접속 URL 출력 (DX 개선).
