# Data Model: Pure Text Board Service

## Entities

### User
시스템 사용자 정보를 관리합니다.
- `id`: Int (PK, Auto-increment)
- `email`: String (Unique)
- `password`: String (Hashed)
- `name`: String
- `createdAt`: DateTime

### Post
게시글 정보를 관리합니다. 본문은 Plain Text만 허용합니다.
- `id`: Int (PK, Auto-increment)
- `authorId`: Int (FK to User.id)
- `title`: String
- `content`: Text (HTML/Image 태그 포함 불가)
- `isPrivate`: Boolean (Default: false)
- `privatePw`: String (Hashed, Optional)
- `viewCount`: Int (Default: 0)
- `createdAt`: DateTime

### Comment
1계층 구조의 댓글을 관리하며, Soft Delete 방식을 사용합니다.
- `id`: Int (PK, Auto-increment)
- `postId`: Int (FK to Post.id)
- `authorId`: Int (FK to User.id)
- `content`: String
- `isDeleted`: Boolean (Default: false)
- `createdAt`: DateTime

### Like
사용자와 게시글 간의 좋아요 관계를 관리합니다.
- `userId`: Int (FK to User.id)
- `postId`: Int (FK to Post.id)
- **Constraint**: Unique Compound Key (`userId`, `postId`)

## State Transitions & Validation Rules

1. **Post Content**: 서버사이드에서 입력값에 대한 `striptags` 또는 유사한 필터링을 수행하여 Plain Text만 저장되도록 보장합니다.
2. **Private Post**:
   - `isPrivate`가 true인 경우 `privatePw`는 반드시 4자리 이상이어야 합니다.
   - 상세 조회 API 호출 시, 유효한 세션 또는 `privatePw` 검증 없이 `content` 필드를 반환하지 않습니다.
3. **Comment Deletion**: `DELETE` 요청 시 물리적 삭제 대신 `isDeleted = true`로 업데이트합니다.
4. **Like Toggle**: 이미 존재하는 (`userId`, `postId`) 쌍에 대한 요청은 삭제(Unlike)를 수행하고, 존재하지 않으면 생성(Like)합니다.
