# Research: Home Page Dashboard

## 1. 실시간 통계 산출 방식 (Statistics Aggregation)

### Decision
Prisma의 `count()` 함수를 사용하여 실시간으로 데이터를 집계함.

### Rationale
- 데이터 규모가 초기 단계이므로 복잡한 캐싱 레이어 없이도 충분한 성능을 보장함.
- `Post.count({ where: { isPrivate: false } })`와 `User.count()`를 통해 정확한 수치를 제공할 수 있음.

### Alternatives Considered
- **Redis Caching**: 데이터가 수십만 건 이상으로 늘어날 경우 고려 대상이나, 현재는 오버엔지니어링으로 판단됨.
- **Database Triggers/Counters**: 별도의 통계 테이블을 운영하는 방식도 있으나, 단순 카운트 작업에는 Prisma 내장 기능이 더 직관적임.

---

## 2. 인기 게시물 선정 로직 (Popular Posts Logic)

### Decision
Prisma의 `_count` aggregation 기능을 사용하여 `likes`가 가장 많은 게시물을 상위 5개 추출함.

### Rationale
- 별도의 복잡한 SQL 쿼리 없이 Prisma API만으로 구현 가능함.
- `orderBy: { likes: { _count: 'desc' } }` 형식을 사용하여 가독성 높은 코드를 유지함.

### Implementation Detail
```typescript
const popularPosts = await prisma.post.findMany({
  where: { isPrivate: false },
  take: 5,
  orderBy: {
    likes: {
      _count: 'desc'
    }
  },
  select: {
    id: true,
    title: true,
    createdAt: true,
    _count: {
      select: { likes: true }
    }
  }
});
```

---

## 3. 미니멀리즘 디자인 및 레이아웃 (Minimalist Design)

### Decision
Vanilla CSS의 Flexbox와 Grid를 활용하여 텍스트 중심의 레이아웃을 구성함.

### Rationale
- "Pure Text" 컨셉에 맞춰 이미지 사용을 배제하고 폰트 크기, 굵기, 여백(Margin/Padding)만으로 계층 구조를 형성함.
- 시스템 폰트 스택을 사용하여 로딩 속도를 극대화함.

---

## 4. 보안 및 데이터 노출 범위 (Security)

### Decision
메인 화면 API 응답에서 `content` 필드를 제외하고 `title`, `authorName`, `createdAt` 등 최소한의 메타데이터만 포함함.

### Rationale
- 사양서의 보안 규칙을 준수하여 상세 페이지 진입 전에는 본문 노출을 원천 차단함.
- 불필요한 데이터 전송을 줄여 네트워크 효율성을 높임.
