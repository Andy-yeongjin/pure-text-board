# Research: Pure Text Board Service

## Decision: Framework Alignment (App Router vs Pages Router)
- **Decision**: Next.js 14+ **App Router**를 사용하되, `common/server.js`와의 통합을 위해 Express Proxy 레이어를 유지합니다.
- **Rationale**: 사용자의 명시적 요구사항(Next.js 14+ App Router)과 최신 기술 트렌드를 반영하되, Constitution의 핵심 원칙인 공유 서버 아키텍처를 준수하기 위함입니다.
- **Alternatives considered**: Pages Router 사용 (사용자 요구사항 위배로 기각).

## Decision: Authentication Integration (NextAuth.js vs Centralized JWT)
- **Decision**: **Centralized JWT (`auth_token`)** 방식을 우선 채택하여 `common/server.js`와의 호환성을 유지합니다.
- **Rationale**: Constitution VI(중앙 집중식 인증)는 비타협적 원칙입니다. NextAuth.js 대신 `common/server.js`에서 발급한 `auth_token`을 미들웨어에서 검증하는 방식을 사용합니다.
- **Alternatives considered**: NextAuth.js 사용 (Constitution 위배로 기각).

## Decision: Database & ORM
- **Decision**: **PostgreSQL + Prisma ORM**을 사용합니다.
- **Rationale**: 강력한 타입 안정성과 복잡한 관계(Unique Compound Key 등) 처리에 적합합니다.
- **Alternatives considered**: MySQL (PostgreSQL이 JSONB 등 확장성 면에서 유리).

## Decision: Testing Strategy
- **Decision**: **Jest + Playwright**를 사용합니다.
- **Rationale**: 단위 테스트(Jest)와 사용자 시나리오 검증(Playwright)을 통해 재현성과 안정성을 확보합니다 (Constitution IV 준수).

## Decision: Port Assignment
- **Decision**: **Port 3004**를 할당합니다 (test004가 3003이므로 차순위).
- **Rationale**: Constitution VII(엄격한 포트 관리) 준수.
