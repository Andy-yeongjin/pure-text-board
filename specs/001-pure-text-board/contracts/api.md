# API Contracts: Pure Text Board Service

## Post API

### GET /api/posts
게시글 목록을 조회합니다.
- **Query Params**: `page`, `limit`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 1,
      "title": "Hello World",
      "author": "Alice",
      "isPrivate": false,
      "viewCount": 10,
      "createdAt": "2026-02-25T00:00:00Z"
    }
  ]
  ```

### GET /api/posts/:id
게시글 상세 정보를 조회합니다.
- **Request Headers**: `Cookie: auth_token=...`
- **Response (Public)**: `200 OK`
  ```json
  {
    "id": 1,
    "content": "Plain text content...",
    "isPrivate": false
  }
  ```
- **Response (Private - Before Auth)**: `200 OK`
  ```json
  {
    "id": 2,
    "isPrivate": true,
    "content": null
  }
  ```

### POST /api/posts/:id/verify-password
비밀글 비밀번호를 검증합니다.
- **Body**: `{ "password": "..." }`
- **Response**: `200 OK` (Set-Cookie: private_access_token)

## Interaction API

### POST /api/posts/:id/like
좋아요를 토글합니다.
- **Response**: `200 OK` `{ "liked": true/false, "count": 10 }`

### DELETE /api/comments/:id
댓글을 삭제(Soft Delete)합니다.
- **Response**: `200 OK` `{ "success": true }`
