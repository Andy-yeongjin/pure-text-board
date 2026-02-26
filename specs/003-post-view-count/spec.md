# Feature Specification: Post View Count & UI/UX Revamp

**Status**: Implemented (완료)

## User Story 5 - Minimalist Home Dashboard (Priority: P2)
- **Goal**: 메인화면에서 불필요한 목록을 제거하고 서비스의 본질과 통계만 강조.
- **Success Criteria**: 히어로 섹션의 강렬한 문구와 깨끗한 통계 카드가 조화롭게 배치됨.

## Requirements Update
- **FR-007**: 메인화면(`page.tsx`)은 게시글 목록을 표시하지 않으며, 대신 서비스의 핵심 가치를 담은 히어로 섹션과 전체 통계 정보를 제공함.
- **FR-008**: 공통 서버의 `/terms` 및 `/common-error` 페이지는 프로젝트의 메인 디자인 시스템(Indigo)을 100% 계승함.

## Success Criteria (Final)
- [x] **본질적 소통**: 메인화면 문구가 서비스의 정체성을 명확히 전달함.
- [x] **완벽한 격리**: 로그아웃 후 어떠한 경로로도 이전 비밀글 권한이 유지되지 않음.
- [x] **시각적 조화**: 프로젝트 내부 페이지와 공통 페이지 간의 이질감이 전혀 없음.
