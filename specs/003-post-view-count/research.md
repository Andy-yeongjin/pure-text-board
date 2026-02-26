# Research: Post View Count & Architecture Migration

## Decision Log

### D1: 데이터베이스 접근 방식 (Better-SQLite3 전환)
- **Decision**: `PrismaClient`를 완전히 제거하고 `better-sqlite3`를 사용하여 직접 SQL 쿼리를 수행함.
- **Rationale**: 프로젝트 헌장(Constitution v1.4.0)의 "공통 레이어에서의 ORM 배제 및 순수 SQLite 사용 원칙"을 준수하고 추상화 오버헤드를 최소화함.
- **Result**: `src/prisma`를 `src/db`로 리네임하고, `src/lib/db.ts` 싱글톤 패턴 도입.

### D2: 조회수 증가 로직 (Atomic Update)
- **Decision**: 게시글 상세 조회 API 호출 시 SQL의 `UPDATE` 문을 사용하여 원자적으로 조회수를 증가시킴.
- **Rationale**: 데이터 일관성을 보장하고 네트워크 요청 횟수를 줄임.

### D3: UI 컴포넌트 데이터 통합
- **Decision**: `LikeButton` 컴포넌트 내부에 조회수(`viewCount`) 표시를 통합함.
- **Rationale**: 상호작용 영역의 시각적 일관성을 확보하고 코드 재사용성을 높임.

### D4: 서버 사이드 쿠키 전달 (Auth Forwarding)
- **Decision**: Next.js 서버 컴포넌트(`page.tsx`)에서 API 호출 시 브라우저의 모든 쿠키를 `headers`에 담아 전달함.
- **Rationale**: 서버 간 통신 시에도 로그인 토큰 및 비밀글 권한 쿠키(`private_access_*`)를 검증하기 위함.

### D5: 공통 서버 UI 위임 (UI Delegation)
- **Decision**: 공통 서버(`common/server.js`)가 직접 렌더링하던 `/login` 화면을 제거하고 Next.js 앱의 커스텀 페이지로 위임함.
- **Rationale**: 프로젝트 전체의 디자인 톤앤매너(Indigo 테마) 일관성을 유지하기 위함.

## Technical Context

### Dependencies
- `better-sqlite3`: 로컬 SQLite 파일 직접 접근.
- `dotenv`: 공통 서버와 프로젝트 간 `JWT_SECRET` 공유.
- `bcryptjs`: 비밀번호 암호화 및 검증.

### Patterns
- **Singleton Database Connection**: 어플리케이션 전체에서 하나의 DB 연결 인스턴스 공유.
- **Indigo & Clean Card UI**: 일관된 시각적 아이덴티티 적용.
- **Permission-Based Content Visibility**: 작성자 여부와 쿠키 기반의 본문 노출 제어.
