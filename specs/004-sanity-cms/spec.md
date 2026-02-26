# Feature Specification: Sanity CMS Data Store Integration (Refined)

**지침: 모든 명세서 내용은 반드시 한글로 작성합니다.**

**Feature Branch**: `004-sanity-cms`  
**Created**: 2026-02-26  
**Status**: Draft (재설계됨)
**Input**: "sanity를 사용할꺼야"

## Clarifications

### Session 2026-02-26
- Q: 사용자 인증 방식 (Authentication) → A: Custom JWT + Sanity Data: 기존처럼 서버가 Sanity에서 유저 정보를 조회해 검증하고 JWT 토큰을 발행함.
- Q: 데이터 마이그레이션 전략 (Migration) → A: 이전하지 않음: 기존 로컬 데이터를 이전하지 않고 Sanity 클라우드에서 새롭게 데이터를 시작함.
- Q: 게시글 조회수 증가 방식 (Analytics) → A: Direct Sanity Patch: 서버(API)에서 Sanity 문서의 viewCount 필드를 직접 1씩 증가시킴.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sanity Studio를 통한 콘텐츠 관리 (Priority: P1)
관리자 또는 작성자가 Sanity Studio의 웹 인터페이스를 통해 게시글, 사용자, 댓글 정보를 통합 관리하는 여정입니다.

### User Story 2 - 웹사이트에서의 데이터 연동 (Priority: P1)
일반 사용자가 웹사이트에 접속했을 때, Sanity CMS에 저장된 게시글 목록, 댓글, 좋아요 수를 실시간으로 확인하는 여정입니다.

### User Story 3 - ID 시스템 전환 (Priority: P2)
시스템이 기존 정수형(Int) ID에서 Sanity의 문자열(_id) 기반 시스템으로 안전하게 전환되어도 모든 링크와 데이터 조회가 정상 작동하는 여정입니다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Next.js 프로젝트와 Sanity CMS 데이터셋을 연결하기 위한 클라이언트(Singleton)를 구성해야 합니다.
- **FR-002**: 모든 데이터(Post, User, Comment, Like)를 Sanity 문서로 관리하며, 로컬 SQLite 의존성을 100% 제거해야 합니다.
- **FR-003**: **ID 리팩토링**: 모든 API 파라미터 및 프론트엔드 데이터 타입에서 ID를 `string` 타입으로 전환해야 합니다.
- **FR-004**: **기능 유지**: 기존의 댓글 작성/조회 및 좋아요 토글 기능을 Sanity API 기반으로 완벽히 재구현해야 합니다.
- **FR-005**: **비밀글 제거**: Sanity 통합 시 비밀글 기능을 제외하며, 관련 UI(비밀번호 입력, 비밀글 토글 등)를 모두 제거합니다.
- **FR-006**: 게시글 상세 조회 시, 서버 사이드에서 `viewCount`를 실시간으로 증가시켜야 합니다.

### Key Entities

- **Post**: 제목, 본문, 작성자 참조, 조회수 등을 포함.
- **User**: 계정 정보 및 인증 데이터.
- **Comment**: 게시글 참조, 작성자 참조, 내용 등을 포함.
- **Like**: 게시글 참조, 사용자 참조의 관계 객체.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 게시글, 댓글, 좋아요 기능이 Sanity 클라우드 상에서 100% 정상 작동해야 합니다.
- **SC-002**: 모든 페이지의 ID 참조가 문자열 기반으로 오류 없이 연결되어야 합니다.
- **SC-003**: 비밀글 관련 UI가 사용자에게 노출되지 않아야 합니다.
- **SC-004**: 서버리스 환경(Vercel) 배포 후 데이터 영속성이 100% 보장되어야 합니다.

## Assumptions & Constraints

- **ID Transition**: 기존 숫자로 된 링크는 더 이상 유효하지 않음을 사용자에게 고지하거나 새 ID 시스템을 따릅니다.
- **Prisma Removal**: `better-sqlite3` 패키지 및 `src/db/dev.db`는 최종 단계에서 삭제합니다.
