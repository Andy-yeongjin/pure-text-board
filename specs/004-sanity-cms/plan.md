# Implementation Plan: Sanity CMS Integration

**지침: 모든 계획서 내용은 반드시 한글로 작성합니다.**

**Branch**: `004-sanity-cms` | **Date**: 2026-02-26 | **Spec**: `/specs/004-sanity-cms/spec.md`

## Summary

본 프로젝트는 Vercel 등의 서버리스 환경에서 SQLite 파일의 데이터 휘발성 문제를 해결하기 위해, 모든 영구 데이터를 **Sanity CMS(Cloud)**로 이전 및 통합합니다. `better-sqlite3` 의존성을 제거하고 `next-sanity`를 사용하여 게시글 관리 및 통합 인증을 구현합니다.

## Technical Context

- **Language/Version**: TypeScript
- **Framework**: Next.js 14 (App Router)
- **CMS**: Sanity CMS (Headless CMS)
- **Primary Dependencies**: `next-sanity`, `@sanity/client`, `jsonwebtoken`, `bcryptjs`
- **Storage**: Sanity Cloud Dataset
- **Testing**: Manual verification, Sanity Studio validation
- **Project Type**: Web Service (Full-stack)

## Constitution Check

- [x] **Violation**: SQLite 대신 외부 CMS(Sanity) 사용.
- [x] **Justification**: 서버리스 환경의 파일 시스템 제약(Data Volatility)을 해결하고, 프로덕션 환경에서의 안정적인 데이터 영속성을 확보하기 위해 필수적인 선택임.

## Project Structure

### Documentation (this feature)

```text
specs/004-sanity-cms/
├── plan.md              # 이 파일
├── research.md          # Sanity 클라이언트 및 업데이트 로직 연구
├── data-model.md        # Post, User Sanity 스키마 정의
├── quickstart.md        # 패키지 설치 및 환경 설정 가이드
├── contracts/           # Sanity 연동 API 규격
└── tasks.md             # 구현 작업 목록 (TBD)
```

### Source Code Changes

```text
src/
├── db/
│   └── sanity/          # Sanity 스키마 및 설정 파일 관리
├── lib/
│   └── sanity.ts        # Sanity Client 싱글톤 인스턴스
├── app/api/
│   ├── posts/           # SQL 쿼리 대신 Sanity fetch 적용
│   └── auth/            # Sanity 사용자 기반 인증 로직으로 교체
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 외부 서비스 의존성 | 데이터 영속성 확보 | SQLite는 서버리스 환경에서 데이터가 유실됨 |
