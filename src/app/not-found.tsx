export default function NotFound() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>페이지를 찾을 수 없습니다. (404)</h2>
      <p>요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.</p>
      <a href="/posts">게시판 목록으로 돌아가기</a>
    </div>
  );
}
