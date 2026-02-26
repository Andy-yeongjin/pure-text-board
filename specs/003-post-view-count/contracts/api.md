# API Contract: Post View Count Visibility

## GET /api/posts
게시글 목록을 조회할 때 각 게시글의 조회수를 함께 반환합니다.

### Request
- **Method**: `GET`
- **Authentication**: Not required (Public)

### Response (200 OK)
```json
[
  {
    "id": 1,
    "title": "안녕하세요",
    "author": { "name": "테스트유저" },
    "isPrivate": false,
    "viewCount": 15,
    "createdAt": "2026-02-26T10:00:00.000Z",
    "_count": {
      "likes": 5,
      "comments": 3
    }
  }
]
```

---

## GET /api/posts/[id]
특정 게시글을 상세 조회하며, 호출 시 해당 게시글의 조회수가 1 증가합니다.

### Request
- **Method**: `GET`
- **Authentication**: Optional (Required only for private access)

### Response (200 OK)
```json
{
  "id": 1,
  "title": "안녕하세요",
  "content": "게시글 본문입니다.",
  "author": { "name": "테스트유저" },
  "isPrivate": false,
  "viewCount": 16,
  "createdAt": "2026-02-26T10:00:00.000Z",
  "likes": [...],
  "comments": [...]
}
```
