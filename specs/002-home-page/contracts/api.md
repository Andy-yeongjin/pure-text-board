# API Contract: Home Page Dashboard

## 1. 개요 (Overview)
메인 화면(Dashboard) 구성에 필요한 데이터인 서비스 통계, 최근 게시물, 인기 게시물을 제공하는 API 정의.

---

## 2. API Endpoints

### 2.1 메인 화면 데이터 조회 (Get Dashboard Data)

- **Method**: `GET`
- **Path**: `/api/dashboard`
- **Auth**: Not Required (Public)

#### Request Parameters
None

#### Success Response
- **Status**: `200 OK`
- **Content-Type**: `application/json`

```json
{
  "stats": {
    "totalPublicPosts": 150,
    "totalUsers": 42
  },
  "recentPosts": [
    {
      "id": 105,
      "title": "안녕하세요, 첫 글입니다.",
      "createdAt": "2026-02-25T14:30:00.000Z",
      "author": { "name": "김철수" }
    },
    ...
  ],
  "popularPosts": [
    {
      "id": 88,
      "title": "이 글이 왜 인기가 많죠?",
      "createdAt": "2026-02-20T09:15:00.000Z",
      "author": { "name": "이영희" },
      "likesCount": 25
    },
    ...
  ]
}
```

#### Error Response
- **Status**: `500 Internal Server Error`
- **Body**: `{ "error": "Failed to fetch dashboard data" }`

---

## 3. 데이터 보안 규칙 (Data Security Rules)

- **비밀글 필터링**: 모든 응답에서 `isPrivate: true`인 게시물은 반드시 제외되어야 함.
- **필드 제한**: `content`, `privatePw`, `authorId` 등 불필요하거나 민감한 필드는 응답 스키마에서 제외함.
- **인증 무관**: 서비스 홍보를 위해 누구나(비로그인 사용자 포함) 조회 가능해야 함.
