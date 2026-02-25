<!--
<sync_impact_report>
- Version change: 1.2.0 → 1.2.1
- List of modified principles:
  - Technical Constraints: Changed Pages Router to App Router preferred to align with modern standards and user requirements.
- Added sections: None.
- Removed sections: None.
- Templates requiring updates: ✅ Verified.
- Follow-up TODOs: None.
</sync_impact_report>
-->

# Nodejs Projects (TEST001) Constitution
<!-- Shared Server & SDD Based Architecture -->

## Core Principles

### I. Shared Server Architecture (공유 서버 아키텍처)
모든 개별 프로젝트(test001, test002 등)는 반드시 `common/server.js`의 `startSharedServer`를 사용하여 실행되어야 합니다. 서버 설정 로직을 개별 프로젝트에서 파편화하는 것을 엄격히 금지하며, 공통 미들웨어 및 API 규격을 준수해야 합니다.
**Rationale**: 서버 설정의 일관성을 유지하고 중복 코드를 방지하여 유지보수성을 극대화합니다.

### II. Spec-Driven Development (SDD, 사양 기반 개발)
모든 기능 개발은 다음의 사이클을 준수합니다:
1. 사양 정의 (`/speckit.specify`)
2. 기술 설계 (`/speckit.plan`)
3. 작업 분할 및 구현 (`/speckit.tasks` & `/speckit.implement`)
설계가 완료되지 않은 상태에서의 구현을 지양하며, 모든 변경 사항은 사양서에 근거해야 합니다.
**Rationale**: 설계 우선 원칙을 통해 기술 부채를 방지하고 고품질의 산출물을 보장합니다.

### III. Code Quality & Simplicity (코드 품질 및 단순성)
모든 구현은 명확하고 이해 가능한 구조를 유지하며, 불필요한 복잡성을 지양합니다. "동작하는 코드"를 넘어 "읽기 좋고 관리하기 쉬운 코드"를 지향하며, YAGNI(You Ain't Gonna Need It) 원칙을 준수합니다.
**Rationale**: 기술 부채를 최소화하고 팀 내 협업 및 장기적인 코드 관리를 용이하게 합니다.

### IV. Testing & Reproducibility (테스트 및 재현성)
기능의 완성도는 단순히 동작 여부가 아니라, 유지보수 가능성과 재현성을 기준으로 판단합니다. 명확한 테스트 기준을 수립하고, 가능한 경우 자동화된 테스트를 통해 시스템의 안정성과 신뢰성을 확보합니다.
**Rationale**: 코드 변경에 따른 사이드 이펙트를 사전에 방지하고 지속 가능한 개발 환경을 구축합니다.

### V. UX Consistency & Performance (UX 일관성 및 성능)
사용자 경험(UX)의 일관성을 유지하고 성능 요구사항을 최우선으로 고려합니다. 로딩 속도, 반응성, 시각적 일관성을 엄격히 관리하며, 공통 컴포넌트와 스타일 가이드를 준수합니다.
**Rationale**: 사용자 만족도를 높이고 전문적인 서비스 품질을 유지합니다.

### VI. Centralized Authentication (중앙 집중식 인증)
인증은 `common/server.js`에서 관리하는 JWT 기반 쿠키 인증(`auth_token`)을 따릅니다. 개별 프로젝트에서 별도의 인증 로직을 구현하지 않으며, `/login`, `/signup` 등 공통 경로를 침범하지 않습니다.
**Rationale**: 통합된 인증 보안 체계를 유지하고 개별 프로젝트의 복잡도를 낮춥니다.

### VII. Strict Port Management (엄격한 포트 관리)
포트 번호는 프로젝트 생성 순서에 따라 순차적으로 할당합니다 (test001: 3000, test002: 3001 등). 신규 프로젝트 추가 시 이전 포트 번호에 +1을 하여 할당하며, 충돌 방지를 위해 이 문서를 즉시 업데이트해야 합니다.
**Rationale**: 인프라 구성의 예측 가능성을 확보하고 개발 환경 간 충돌을 방지합니다.

## Technical Constraints

- **Stack**: Next.js (App Router preferred) + Express Integration.
- **Styling**: Vanilla CSS 선호 (TailwindCSS 사용 시 별도 승인 필요).
- **ESM Mode**: 모든 서버 코드는 `import/export`를 사용하는 ESM 모드로 작성합니다.

## Development Workflow

1. 신규 기능 요구 시 반드시 `specification.md`를 먼저 작성하여 승인받습니다.
2. `common/server.js` 수정 시 모든 하위 프로젝트(`test00x`)의 영향도를 전수 체크합니다.
3. 에러 페이지는 공통 HTML(`ERROR_PAGE_HTML`, `NOT_FOUND_PAGE_HTML`)을 사용하여 일관성을 유지합니다.

## Governance
이 Constitution은 모든 개발 관행에 우선합니다. 규칙 변경이 필요한 경우 다음 절차를 따릅니다:

1. **Amendment Procedure**: 문서 업데이트 후 변경 이력을 Sync Impact Report에 기록합니다.
2. **Versioning Policy**: Semantic Versioning(MAJOR.MINOR.PATCH)을 준수합니다.
3. **Compliance Review**: 모든 설계 및 구현은 본 헌장의 원칙 준수 여부를 검토받아야 합니다.

**Version**: 1.2.1 | **Ratified**: 2026-02-25 | **Last Amended**: 2026-02-25
