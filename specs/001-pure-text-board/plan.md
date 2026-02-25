# Implementation Plan: Pure Text Board Service

**Branch**: `001-pure-text-board` | **Date**: 2026-02-25 | **Spec**: [spec.md](spec.md)

## Summary
보안이 강화된 순수 텍스트 커뮤니티 게시판을 구현합니다. `common/server.js` 기반의 중앙 인증 체계를 따르며, Next.js App Router를 사용하여 현대적인 웹 환경을 제공합니다. 비밀글 보안 및 좋아요 중복 방지 로직이 핵심입니다.

## Technical Context

**Language/Version**: TypeScript / Node.js 20+  
**Primary Dependencies**: Next.js 14+, Prisma ORM, Express (Shared Server integration)  
**Storage**: PostgreSQL  
**Testing**: Jest, Playwright  
**Target Platform**: Shared Node.js Server Environment
**Project Type**: Web Service  
**Performance Goals**: < 1s Page Load / Text Rendering  
**Constraints**: No HTML/Images, Secure Private Content (Server-side validation)  
**Scale/Scope**: Single community board module

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Shared Server Architecture**: `common/server.js`의 `startSharedServer`를 통한 실행 준수 예정. (Pass)
2. **Spec-Driven Development**: /speckit.specify 및 /speckit.plan 절차 준수 중. (Pass)
3. **Code Quality & Simplicity**: Plain Text 전용으로 복잡성 제거. (Pass)
4. **Testing & Reproducibility**: Jest/Playwright 도입으로 재현성 확보. (Pass)
5. **UX Consistency & Performance**: Vanilla CSS 및 공통 에러 페이지 사용. (Pass)
6. **Centralized Authentication**: `auth_token` 쿠키 기반 인증 시스템 통합. (Pass)
7. **Strict Port Management**: Port 3004 할당. (Pass)

## Project Structure

### Documentation (this feature)

```text
specs/001-pure-text-board/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
src/
├── app/                 # Next.js App Router
│   ├── (auth)/          # Authentication routes (login/signup)
│   ├── posts/           # Post listing and details
│   └── api/             # Internal API endpoints
├── components/          # Shared UI components (Pure Text focus)
├── lib/                 # Core logic (auth validation, text filtering)
├── prisma/              # Schema and migrations
└── tests/
    ├── integration/     # Playwright user journeys
    └── unit/            # Jest business logic tests
```

**Structure Decision**: Next.js App Router 표준 구조를 따르되, `src/` 디렉토리를 사용하여 소스 코드를 격리합니다.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Next.js App Router | 사용자 요구사항 (v14+) | Pages Router는 최신 기능을 활용하기에 제약이 있음 |
