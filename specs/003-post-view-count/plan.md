# Implementation Plan: Post View Count & Architecture Migration

**Branch**: `003-post-view-count` | **Date**: 2026-02-26 | **Spec**: `/specs/003-post-view-count/spec.md`

## Summary

본 프로젝트는 조회수 기능을 넘어 서비스의 **본질적인 가치(텍스트 집중, 보안, 데이터)**를 강조하는 방향으로 아키텍처와 UI를 전면 개편하였습니다. Prisma를 제거하여 가벼운 성능을 확보하였고, 메인화면을 미니멀한 대시보드로 리모델링하여 사용자 경험을 고도화하였습니다.

## Technical Context

### 🔑 Security & Auth
- **Session**: `JWT` + `Session Cookies` 기반의 2중 보안.
- **Cleanup**: 로그아웃 시 서버 측에서 모든 관련 쿠키를 명시적으로 파괴.

### 🎨 Minimalist UI Strategy
- **Home**: 복잡한 목록형 데이터를 지양하고 **히어로 메시지**와 **핵심 지표(Stats)**만 노출.
- **Consistency**: 프로젝트 전용 페이지와 공통 인프라 페이지의 시각적 경계를 허물고 Indigo 테마로 통합.

## Project Structure (Final)

```text
TEST001/
├── src/
│   ├── app/
│   │   ├── page.tsx     # [Home] 히어로 섹션 및 통계 기반 미니멀 대시보드
│   │   ├── login/       # 중복 제거된 깔끔한 로그인 UI
│   │   └── posts/       # 조회수가 통합된 게시판 시스템
├── common/              # 테마 폴리싱이 완료된 공통 자산
```

## Implementation Strategy (DONE)
1. **Minimalism**: 메인화면의 불필요한 요소 제거 및 본질적 문구 도입.
2. **Security High-water Mark**: 비밀글 및 로그아웃 보안 로직의 완결성 확보.
3. **Architecture Stability**: 순수 SQLite 기반의 견고한 데이터 처리 레이어 구축.
