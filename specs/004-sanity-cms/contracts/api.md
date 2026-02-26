# API Contract: Sanity CMS Integration

기존의 SQLite 기반 API 라우트들이 Sanity CMS를 소스로 사용하도록 인터페이스를 유지하면서 내부 로직을 변경합니다.

## GET /api/posts
게시글 목록을 Sanity에서 조회하여 반환합니다.

### Request
- **Method**: `GET`
- **Query Params**: 없음

### Response (200 OK)
```json
[
  {
    "id": "sanity-document-id",
    "title": "게시글 제목",
    "author": { "name": "작성자 이름" },
    "viewCount": 10,
    "createdAt": "2026-02-26T10:00:00Z"
  }
]
```

---

## GET /api/posts/[id]
특정 게시글을 상세 조회하고 조회수를 증가시킵니다.

### Request
- **Method**: `GET`

### Response (200 OK)
```json
{
  "id": "sanity-document-id",
  "title": "게시글 제목",
  "content": "순수 텍스트 본문...",
  "author": { "name": "작성자 이름" },
  "viewCount": 11,
  "createdAt": "2026-02-26T10:00:00Z"
}
```

---

## POST /api/auth/login
Sanity에 저장된 사용자 정보를 기반으로 인증을 수행합니다.

### Request
- **Method**: `POST`
- **Body**: `{ "email": "...", "password": "..." }`

### Response (200 OK)
```json
{
  "success": true,
  "user": { "id": "user-id", "name": "...", "email": "..." }
}
```
