'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>문제가 발생했습니다.</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>다시 시도</button>
      <br /><br />
      <a href="/posts">게시판으로 돌아가기</a>
    </div>
  );
}
