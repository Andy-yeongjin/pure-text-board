# Feature Specification: Pure Text Board Service

**Feature Branch**: `001-pure-text-board`  
**Created**: 2026-02-25  
**Status**: Draft  
**Input**: User description: "Next.js 환경에서 작동하는 보안이 강화된 순수 텍스트 커뮤니티 게시판."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Guest Browsing (Priority: P1)

비로그인 사용자가 게시판의 전체적인 흐름을 파악하고 게시글을 조회하는 여정입니다.

**Why this priority**: 서비스의 가장 기본이 되는 기능이며, 콘텐츠 접근성을 보장해야 합니다.

**Independent Test**: 비로그인 상태에서 게시글 목록이 정상적으로 보이고, 일반 게시글 클릭 시 상세 내용이 노출되는지 확인합니다.

**Acceptance Scenarios**:

1. **Given** 비로그인 상태일 때, **When** 게시글 목록 페이지에 접속하면, **Then** 모든 공개 게시글의 제목과 작성자 정보가 표시되어야 합니다.
2. **Given** 공개 게시글을 선택했을 때, **When** 상세 페이지로 이동하면, **Then** 텍스트 형식의 본문 내용이 정상적으로 표시되고 조회수가 1 증가해야 합니다.
3. **Given** 비밀 게시글(`isPrivate: true`)을 선택했을 때, **When** 상세 페이지로 이동을 시도하면, **Then** 로그인 페이지로 리다이렉트되어야 합니다.

---

### User Story 2 - Member Interaction & Secret Posts (Priority: P2)

로그인한 사용자가 게시글을 작성하고, 비밀글 기능을 사용하여 보안을 유지하는 여정입니다.

**Why this priority**: 커뮤니티의 핵심인 상호작용과 보안 기능을 담당합니다.

**Independent Test**: 로그인 후 비밀글을 작성하고, 본인이 아닌 다른 회원이 접근할 때 비밀번호 입력 폼이 나타나는지 확인합니다.

**Acceptance Scenarios**:

1. **Given** 로그인 상태에서 글쓰기 버튼을 눌렀을 때, **When** 비밀글 옵션을 체크하고 4자리 이상의 비밀번호와 함께 내용을 저장하면, **Then** 게시글이 성공적으로 생성되어야 합니다.
2. **Given** 다른 사용자가 작성한 비밀글에 접근할 때, **When** 상세 페이지에 진입하면, **Then** 비밀번호 입력 폼이 나타나야 하며, 서버는 아직 본문 내용을 전송하지 않아야 합니다.
3. **Given** 올바른 비밀번호를 입력했을 때, **When** 확인 버튼을 누르면, **Then** 게시글의 본문 내용이 표시되어야 합니다.

---

### User Story 3 - Social Interactions (Priority: P3)

좋아요와 댓글을 통해 다른 사용자와 소통하는 여정입니다.

**Why this priority**: 사용자 참여도를 높이는 소셜 기능입니다.

**Independent Test**: 동일한 게시글에 좋아요를 반복 클릭했을 때 숫자가 토글되는지, 댓글 삭제 시 문구가 변경되는지 확인합니다.

**Acceptance Scenarios**:

1. **Given** 게시글 상세 페이지에서, **When** 좋아요 버튼을 처음 누르면, **Then** 좋아요 수가 1 증가하고 상태가 활성화되어야 합니다.
2. **Given** 이미 좋아요를 누른 게시글에서, **When** 다시 좋아요 버튼을 누르면, **Then** 좋아요 수가 1 감소하고 상태가 비활성화되어야 합니다.
3. **Given** 본인이 작성한 댓글에서, **When** 삭제 버튼을 누르면, **Then** 데이터베이스에서는 유지되되 화면에는 "삭제된 댓글입니다"라고 표시되어야 합니다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 시스템은 Next.js 14+ App Router와 TypeScript를 기반으로 구축되어야 합니다.
- **FR-002**: 게시글 본문은 오직 순수 텍스트(Plain Text)만 허용하며, HTML 태그나 이미지는 렌더링되지 않아야 합니다.
- **FR-003**: 비밀글 작성 시 최소 4자리 이상의 비밀번호 입력을 강제해야 합니다.
- **FR-004**: 좋아요 기능은 사용자 ID와 게시글 ID의 조합(`userId`, `postId`)으로 유니크하게 관리되어야 합니다.
- **FR-005**: 댓글 삭제 시 물리적 삭제가 아닌 `isDeleted` 플래그를 사용하는 소프트 삭제(Soft Delete) 방식을 적용해야 합니다.
- **FR-006**: 비밀글의 본문(`content`) 데이터는 서버 API 단계에서 비밀번호 검증이 완료되기 전까지 클라이언트로 전송되지 않아야 합니다.

### Key Entities

- **User**: 회원 정보 (email, password, name)
- **Post**: 게시글 정보 (title, content, isPrivate, privatePw, viewCount)
- **Comment**: 댓글 정보 (content, isDeleted)
- **Like**: 좋아요 정보 (userId, postId 매핑)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 사용자가 게시글 상세 페이지에 접속했을 때, 텍스트 렌더링 및 조회가 1초 이내에 완료되어야 합니다.
- **SC-002**: 비밀글의 경우, 비밀번호 검증 전까지 브라우저의 Network 탭을 통해 본문 내용이 유출되지 않음을 보장해야 합니다.
- **SC-003**: 동일 사용자가 같은 게시글에 2개 이상의 좋아요를 생성하는 것이 기술적으로 불가능해야 합니다.
- **SC-004**: 삭제된 댓글이 포함된 목록 조회 시, 시스템은 일관되게 "삭제된 댓글입니다" 문구를 반환해야 합니다.
