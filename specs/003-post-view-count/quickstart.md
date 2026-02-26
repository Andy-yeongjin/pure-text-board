# Quickstart: Post View Count & System Verification

## Prerequisites
- **Database**: `src/db/dev.db` 파일 존재 확인 (Pure SQLite 모드)
- **Dependencies**: `better-sqlite3` 설치 완료

## Setup & Run
1. **개발 서버 실행**:
   ```bash
   npm run dev
   ```
   *터미널에 `Local: http://localhost:3004` 주소가 출력됩니다.*

2. **DB 데이터 확인 (CLI)**:
   ```bash
   node check-db.js
   ```
   *현재 저장된 사용자, 게시글, 댓글 데이터를 표 형태로 확인 가능합니다.*

## Verification Steps

### 1. 게시글 목록 및 대시보드
- `/posts` 및 메인 페이지에서 각 게시글의 조회수(👁)가 표시되는지 확인.
- 디자인이 Indigo 테마와 카드 레이아웃을 준수하는지 확인.

### 2. 비밀글 보안 및 조회수 증가
- 비밀글 상세 페이지 진입 시 조회수가 1 증가하는지 확인.
- 비회원 또는 본인이 아닌 경우 본문과 댓글이 가려지고 비밀번호 입력창이 나타나는지 확인.
- 비밀번호 입력 후 본문이 정상적으로 잠금 해제되는지 확인.

### 3. 로그인 및 로그아웃
- `/login` 및 `/signup` 페이지가 세련된 커스텀 디자인으로 표시되는지 확인.
- 로그아웃 버튼 클릭 시 로그인 정보 및 모든 비밀글 접근 권한이 삭제되는지 확인.

### 4. 공통 페이지 확인
- `/terms`: 공통 약관 페이지 접속 확인.
- `/common-error`: 예쁜 에러 안내 페이지 확인.
