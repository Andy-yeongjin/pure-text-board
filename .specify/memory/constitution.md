<!--
<sync_impact_report>
- Version change: 1.3.0 → 1.4.0
- List of modified principles:
  - Added Database principle: Preferred use of raw SQLite (better-sqlite3) for shared infrastructure to minimize overhead.
  - Refined Simplicity principle: Explicitly discourage unnecessary ORM usage in common layers.
- Added sections: None.
- Removed sections: None.
- Templates requiring updates: ✅ Verified.
- Follow-up TODOs: None.
</sync_impact_report>
-->

# Nodejs Projects (TEST001) Constitution (프로젝트 헌장)

**지침: 모든 명세서, 계획서, 작업 리스트 및 프로젝트 관련 문서는 반드시 한글로 작성합니다.**

## 핵심 원칙 (Core Principles)

### I. 설계 기반 개발 (SDD, Spec-Driven Development)
모든 기능 개발은 반드시 사양 정의(`/speckit.specify`), 기술 설계(`/speckit.plan`), 작업 분할(`/speckit.tasks`)의 단계를 거쳐야 합니다. 문서화되지 않은 기능 구현은 기술 부채로 간주하며 엄격히 지양합니다.

### II. 품질 및 성능 우선주의 (Quality & Performance First)
코드 품질, 테스트 기준, 사용자 경험(UX)의 일관성, 그리고 성능 요구사항을 최우선으로 하는 원칙을 따릅니다. 로딩 속도와 시스템 반응성은 서비스의 핵심 가치이며, 이를 타협하지 않습니다.

### III. 단순성과 명확성 (Simplicity & Clarity)
모든 구현은 명확하고 이해 가능한 구조를 유지하며, 불필요한 복잡성을 지양합니다. 특히 공유 인프라와 공통 서버 레이어에서는 **불필요한 ORM 사용을 배제하고 순수 SQLite(`better-sqlite3`)를 사용하는 것을 원칙**으로 하여 추상화 오버헤드를 최소화합니다.

### IV. 유지보수 및 재현성 기준 (Maintainability & Reproducibility)
모든 기능은 단순히 현재 동작하는지 여부뿐 아니라, **유지보수 가능성**과 **재현성**을 기준으로 판단합니다. 버그 수정이나 기능 추가 시 해당 변경 사항이 다른 부분에 미치는 영향을 최소화하고, 언제든 동일한 결과를 얻을 수 있도록 설계해야 합니다.

### V. 중앙 집중식 아키텍처 (Shared Architecture)
- **공유 서버**: 모든 프로젝트는 `common/server.js`의 규격을 준수하며 서버 설정을 파편화하지 않습니다.
- **인증 통합**: `auth_token` 기반의 중앙 집중식 JWT 인증 체계를 엄격히 따릅니다.
- **데이터베이스**: 공통 레이어에서는 SQLite 파일에 직접 접근하는 방식을 지향하여 성능과 단순성을 동시에 확보합니다.

## 기술 제약 사항 (Technical Constraints)

- **Framework**: Next.js 14+ (App Router 권장).
- **Database**: 공통 서버는 `better-sqlite3`를 사용하여 로우 쿼리를 수행합니다.
- **Styling**: Vanilla CSS를 기본으로 하며, UI의 시각적 일관성과 가벼운 성능을 유지합니다.
- **Language**: TypeScript를 사용하여 타입 안정성을 확보합니다.
- **Code Mode**: 모든 서버 코드는 ESM(`import/export`) 모드로 작성합니다.

---

**이 Constitution은 프로젝트의 모든 개발 관행에 우선하며, 모든 팀원과 AI 에이전트는 본 원칙을 엄격히 준수해야 합니다.**

**Version**: 1.4.0 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-02-26
