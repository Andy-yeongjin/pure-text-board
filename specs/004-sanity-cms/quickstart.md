# Quickstart: Sanity CMS Integration

## Prerequisites
- Sanity 프로젝트 계정 및 Project ID 필요.
- `.env` 파일에 아래 환경 변수 설정:
  ```env
  SANITY_PROJECT_ID="your-project-id"
  SANITY_DATASET="production"
  SANITY_API_TOKEN="your-write-token"
  ```

## Setup Steps
1. **패키지 설치**:
   ```bash
   npm install next-sanity @sanity/client
   ```
2. **스키마 정의**:
   - `src/db/sanity/schema/`에 스키마 파일 생성.
3. **클라이언트 설정**:
   - `src/lib/sanity.ts`에 Sanity 클라이언트 인스턴스 생성.
4. **API 리팩토링**:
   - `src/app/api/posts/route.ts` 등을 Sanity 쿼리로 교체.

## Verification Steps
1. **Sanity Studio 확인**:
   - `sanity start` 또는 Sanity 클라우드 대시보드에서 글을 작성하고 발행합니다.
2. **웹사이트 조회**:
   - `http://localhost:3004/posts`에서 Sanity에 작성한 글이 보이는지 확인합니다.
3. **조회수 증가**:
   - 게시글 클릭 시 `viewCount`가 Sanity 대시보드에서 실시간으로 반영되는지 확인합니다.
