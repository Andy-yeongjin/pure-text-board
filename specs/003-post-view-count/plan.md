# Implementation Plan: Post View Count & Architecture Migration

**Branch**: `003-post-view-count` | **Date**: 2026-02-26 | **Spec**: `/specs/003-post-view-count/spec.md`

## Summary

본 프로젝트는 게시글 조회수 표시 기능을 구현함과 동시에, 프로젝트 헌장을 준수하기 위해 **Prisma를 완전히 제거하고 순수 SQLite(`better-sqlite3`) 기반 아키텍처로 전환**하였습니다. 또한 로그인/회원가입 등 전체 UI의 톤앤매너를 통일하고 보안 및 개발 경험(DX)을 대폭 개선하였습니다.

## Technical Context

- **Database**: Pure SQLite Mode (`src/db/dev.db`, `better-sqlite3`)
- **Auth Strategy**: `JWT_SECRET` 공유 기반의 통합 인증 + `private_access_*` 기반 비밀글 세션 쿠키
- **UI Theme**: Indigo & Clean Card (Vanilla CSS)
- **DX Improvements**: 터미널 내 로컬 접속 URL 로깅, DB 데이터 확인 스크립트 제공

## Constitution Check

- [x] **ORM 배제**: Prisma 패키지 삭제 및 로우 SQL 쿼리로 전환 완료.
- [x] **단순성 유지**: `src/lib/db.ts` 싱글톤 패턴을 통한 가벼운 DB 접근 로직 구축.

## Project Structure (New)

```text
TEST001/
├── common/
│   └── server.js        # 공통 약관/에러 페이지 추가 및 로그아웃 쿠키 삭제 로직 강화
├── src/
│   ├── db/              # SQLite 데이터 및 스키마 기록 (prisma 폴더 대체)
│   ├── lib/
│   │   ├── db.ts        # 메인 데이터베이스 연결 인스턴스 (PrismaClient 대체)
│   │   └── auth.ts      # 서버 컴포넌트 쿠키 전달 및 권한 체크
│   ├── components/      # LikeButton, CommentSection UI 고도화
│   └── app/
│       ├── login/       # 프로젝트 전용 커스텀 디자인 적용
│       └── signup/      # 프로젝트 전용 커스텀 디자인 적용
```

## Implementation Strategy (DONE)

1. **Architecture Transition**: Prisma를 제거하고 `better-sqlite3` 싱글톤 인스턴스 도입.
2. **API Refactoring**: 모든 API 라우트를 순수 SQL 기반으로 재작성 및 조회수 증가 로직 포함.
3. **Security Fixes**: 서버 컴포넌트 쿠키 전달 로직 구현 및 비밀글 2중 보안 적용.
4. **UI Revamp**: 로그인, 회원가입, 댓글, 비밀번호 입력창의 디자인 통일 및 레이아웃 수정.
5. **DX Polish**: 서버 구동 시 URL 로깅 및 DB 확인 도구(`check-db.js`) 제공.
