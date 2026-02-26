# Data Model: Post View Count Visibility

## Post Entity (Updated)

| Field | Type | Description | Constraints |
| :--- | :--- | :--- | :--- |
| **id** | Integer | 게시글 식별자 (Primary Key) | Auto-increment |
| **authorId** | Integer | 작성자 식별자 (Foreign Key) | References User(id) |
| **title** | String | 게시글 제목 | Required |
| **content** | String | 게시글 본문 (Pure Text) | Required |
| **isPrivate** | Boolean | 비밀글 여부 | Default: 0 (false) |
| **privatePw** | String | 비밀글 비밀번호 (Hashed) | Optional |
| **viewCount** | Integer | 게시글 조회수 | **Default: 0** |
| **createdAt** | DateTime | 작성 일시 | Default: now() |

### Storage Location
- **Path**: `src/db/dev.db` (이전 `src/prisma/dev.db`에서 변경됨)

### Validation Rules
- **View Count**: 조회수는 음수일 수 없으며, 상세 페이지 진입 시마다 원자적으로 `1` 증가함.
- **Visibility Control**: `isPrivate`가 1인 경우, 요청자의 쿠키나 작성자 ID를 검증하여 `content` 노출 여부 결정.

## Operations

### Update View Count (Atomic SQL)
```sql
UPDATE Post SET viewCount = viewCount + 1 WHERE id = ?
```

### Fetch Posts with Meta
```sql
SELECT 
  p.id, p.title, p.isPrivate, p.viewCount, p.createdAt, u.name as authorName,
  (SELECT COUNT(*) FROM Like WHERE postId = p.id) as likesCount,
  (SELECT COUNT(*) FROM Comment WHERE postId = p.id AND isDeleted = 0) as commentsCount
FROM Post p
JOIN User u ON p.authorId = u.id
ORDER BY p.createdAt DESC
```
