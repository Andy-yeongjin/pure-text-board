# 📋 Project Specification: Pure Text Board Service

## 1. 프로젝트 개요
- **목적**: Next.js 환경에서 작동하는 보안이 강화된 순수 텍스트 커뮤니티 게시판.
- **주요 특징**: 비밀글 암호화, 좋아요 중복 방지, 댓글 소프트 삭제(Soft Delete).
- **기술 스택**:
    - **Framework**: Next.js 14+ (App Router)
    - **Language**: TypeScript
    - **Database**: PostgreSQL or MySQL (Prisma ORM)
    - **Authentication**: NextAuth.js

---

## 2. 상세 요구사항 (Functional Requirements)

### 2.1 접근 권한 (Authorization)
- **Guest (비로그인)**: 
    - 게시글 목록 및 상세 내용 조회 가능.
    - 비밀글의 경우 제목만 보이며 클릭 시 로그인 페이지로 리다이렉트.
- **Member (로그인)**:
    - 글쓰기, 수정, 삭제 권한 보유.
    - 좋아요 및 댓글 작성 가능.
    - 비밀글 접근 시 별도의 비밀번호 입력 폼을 거쳐야 함.

### 2.2 게시글 시스템 (Post)
- **입력 제한**: 이미지/HTML 제외, 순수 텍스트(`Plain Text`)만 허용.
- **비밀글 설정**:
    - 작성 시 `isPrivate: true` 설정과 함께 4자리 이상의 비밀번호 입력.
    - **보안 규칙**: 서버 API는 비밀번호 검증 전까지 `content` 필드를 절대 반환하지 않음.
- **조회수 로직**:
    - 상세 페이지 진입 시마다 `viewCount` +1.
    - 본인 작성 글 및 새로고침 시에도 동일하게 카운트 적용.

### 2.3 상호작용 (Interaction)
- **좋아요(Like)**:
    - 1인 1글 1개 제한 (Unique Compound Key: `userId`, `postId`).
    - 클릭 시 토글(Toggle) 방식으로 작동.
- **댓글(Comment)**:
    - 1계층 구조 (대댓글 없음).
    - **삭제 정책**: 물리적 삭제 대신 `isDeleted` 플래그 사용.
    - 화면 표시: 삭제된 데이터는 "삭제된 댓글입니다" 문구로 대체 노출.

---

## 3. 데이터 모델링 (Prisma Schema)



```prisma
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  password  String    // Hashed
  name      String
  posts     Post[]
  comments  Comment[]
  likes     Like[]
}

model Post {
  id          Int       @id @default(autoincrement())
  authorId    Int
  author      User      @relation(fields: [authorId], references: [id])
  title       String
  content     String    @db.Text
  isPrivate   Boolean   @default(false)
  privatePw   String?   // Hashed for private posts
  viewCount   Int       @default(0)
  createdAt   DateTime  @default(now())
  comments    Comment[]
  likes       Like[]
}

model Comment {
  id        Int      @id @default(autoincrement())
  postId    Int
  post      Post     @relation(fields: [postId], references: [id])
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  content   String
  isDeleted Boolean  @default(false)
  createdAt DateTime @default(now())
}

model Like {
  id     Int  @id @default(autoincrement())
  userId Int
  postId Int
  user   User @relation(fields: [userId], references: [id])
  post   Post @relation(fields: [postId], references: [id])

  @@unique([userId, postId])
}