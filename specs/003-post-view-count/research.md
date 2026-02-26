# Research: Home Page Redesign & Security Finalization

## Decision Log

### D6: 메인화면 미니멀리즘 (Home Page Redesign)
- **Decision**: 메인화면에서 최근/인기 게시물 목록을 제거하고 히어로 섹션과 심플 통계로 구성함.
- **Rationale**: 사용자가 서비스에 접속했을 때 복잡한 정보 대신 "순수 텍스트 소통"이라는 본질적 가치에 먼저 집중하게 하기 위함.
- **Result**: 목록 로딩으로 인한 초기 부하 감소 및 시각적 무게감 확보.

### D7: 공통 페이지 스타일 계승 (Theme Integration)
- **Decision**: 공통 서버의 HTML 응답 스타일을 프로젝트의 CSS 변수(`Indigo`)와 일치시킴.
- **Rationale**: 인프라 페이지와 서비스 페이지 간의 단절감을 없애 사용자에게 일관된 브랜드 경험을 제공하기 위함.

### D8: 보안 정책 구체화 (Cookie Cleanup)
- **Decision**: 로그아웃 시 와일드카드 패턴(`private_access_*`)을 사용하여 모든 세션 쿠키를 서버에서 제거하도록 결정.
- **Rationale**: 개별 삭제 시 발생할 수 있는 누락 가능성을 차단하고 확실한 세션 종료를 보장함.
