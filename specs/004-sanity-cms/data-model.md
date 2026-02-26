# Data Model: Sanity CMS Integration (Refined)

## Entities (Sanity Documents)

### 1. Post (게시글)
| Field | Type | Description |
|:---|:---|:---|
| **_id** | string | Sanity 고유 ID |
| **title** | string | 게시글 제목 |
| **content** | text | 순수 텍스트 본문 |
| **author** | reference | User 문서 참조 |
| **viewCount** | number | 조회수 (Default: 0) |
| **publishedAt** | datetime | 발행 일시 |

### 2. User (사용자)
| Field | Type | Description |
|:---|:---|:---|
| **_id** | string | Sanity 고유 ID |
| **email** | string | 이메일 (Unique) |
| **password** | string | bcrypt 해시 |
| **name** | string | 사용자 이름 |

### 3. Comment (댓글)
| Field | Type | Description |
|:---|:---|:---|
| **_id** | string | Sanity 고유 ID |
| **post** | reference | Post 문서 참조 |
| **author** | reference | User 문서 참조 |
| **content** | string | 댓글 내용 |
| **isDeleted** | boolean | 삭제 여부 |
| **createdAt** | datetime | 작성 일시 |

### 4. Like (좋아요)
| Field | Type | Description |
|:---|:---|:---|
| **_id** | string | Sanity 고유 ID |
| **post** | reference | Post 문서 참조 |
| **user** | reference | User 문서 참조 |

---

## Technical Mapping (Type Transition)

- **ID**: `Int` (SQLite) ➡ `string` (Sanity)
- **Relationships**: `Foreign Key` ➡ `reference` (_type: 'reference', _ref: 'doc_id'_)
- **Boolean**: `0/1` (SQLite) ➡ `boolean` (Sanity Native)
