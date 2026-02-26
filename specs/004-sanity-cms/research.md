# Research: Sanity CMS Integration

## Decision Log

### D1: Sanity Client & Integration
- **Decision**: `next-sanity` 라이브러리를 사용하여 App Router와 통합하고, `src/lib/sanity.ts`에서 클라이언트를 관리함.
- **Rationale**: Next.js 공식 권장 라이브러리이며, 캐싱 및 실시간 미리보기 기능을 기본적으로 지원함.

### D2: 조회수 업데이트 (Patch/Increment) 로직
- **Decision**: Sanity Client의 `patch(id).inc({ viewCount: 1 }).commit()` API를 사용하여 서버 사이드(Next.js Route Handlers)에서 직접 업데이트를 수행함.
- **Rationale**: Sanity의 원자적(Atomic) 연산 기능을 사용하여 동시성 이슈를 방지하고, 클라이언트가 아닌 서버에서 수행하여 보안을 강화함.

### D3: 사용자 인증 데이터 저장 방식
- **Decision**: Sanity 내에 `user` 문서 타입을 정의하고, `email`과 `password`(bcrypt 해시)를 필드로 저장함.
- **Rationale**: 모든 데이터를 한 곳에서 관리하여 복잡성을 줄이고, 기존 Custom JWT 로직을 그대로 활용하기 위함.

### D4: 스키마 위치 및 관리
- **Decision**: `src/db/sanity/schema/` 폴더에 Sanity Studio 및 웹사이트에서 공유할 스키마 파일을 관리함.
- **Rationale**: 기존 `src/db` (구 prisma) 폴더의 맥락을 유지하여 데이터 관련 로직을 집중시킴.

## Technical Context

### Best Practices for Sanity in Next.js
- **Environment Variables**: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` 등을 사용하여 보안 유지.
- **Draft Mode**: Sanity의 미리보기 기능을 위해 Next.js 14의 `draftMode()` 활용 권장.
- **Webhook**: 콘텐츠 변경 시 Next.js 온디맨드 재검증(On-demand Revalidation)을 위해 Webhook 설정 고려.

### Sanity Schema for User
```javascript
{
  name: 'user',
  type: 'document',
  fields: [
    { name: 'email', type: 'string', validation: Rule => Rule.required().email() },
    { name: 'password', type: 'string', validation: Rule => Rule.required() },
    { name: 'name', type: 'string' }
  ]
}
```

## Constraints & Gates
- [x] **Constitution Check**: SQLite 대신 Sanity를 사용하는 것에 대한 정당성 확보 (Vercel 배포 시 데이터 영속성).
- [ ] **API Token Security**: 쓰기 권한이 있는 API 토큰이 프론트엔드에 노출되지 않도록 절대 주의.
