# Data Model: Home Page Dashboard

## 1. 개요 (Overview)
기존의 `Post`, `User`, `Like` 모델을 활용하여 메인 화면에 필요한 통계 및 게시물 리스트 데이터를 구성함. 신규 모델 생성은 필요 없음.

---

## 2. 엔티티 관계 및 사용처 (Entities & Usage)

### 2.1 Post (게시글)
- **최근 게시물**: `createdAt` 필드를 기준으로 내림차순 정렬하여 상위 5개 추출 (`where: { isPrivate: false }`).
- **전체 게시글 수**: `count()` 연산 시 `isPrivate: false` 조건 적용.
- **인기 게시물**: `likes` 관계 모델의 개수를 집계하여 정렬.

### 2.2 User (사용자)
- **전체 사용자 수**: `User.count()` 연산으로 전체 가입자 수 노출.

### 2.3 Like (좋아요)
- 인기 게시물 산출을 위한 집계 대상. `Post`와 `User` 간의 다대다 관계를 연결하는 `Like` 모델의 개수를 기준으로 정렬함.

---

## 3. 데이터 제약 사항 (Constraints)

- **공개 설정 준수**: `isPrivate: true`인 게시물은 메인 화면의 모든 목록(최근/인기)에서 제외되어야 함.
- **데이터 노출 제한**: 메인 화면 조회용 API 응답 모델에서 `Post.content`와 `Post.privatePw` 필드는 반드시 제외(exclude) 처리함.

---

## 4. 상태 변화 (State Transitions)
메인 화면은 읽기 전용(Read-only) 대시보드이며, 별도의 데이터 생성/수정 상태 변화는 발생하지 않음. 데이터 변경은 게시판(`001-pure-text-board`) 기능에서 처리된 결과가 메인 화면에 반영되는 구조임.
