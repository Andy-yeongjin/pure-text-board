'use client';

import { useRouter } from 'next/navigation';

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.')) {
      return;
    }

    const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    
    if (res.ok) {
      alert('게시글이 삭제되었습니다.');
      router.push('/posts');
      router.refresh();
    } else {
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <button 
      onClick={handleDelete}
      style={{ 
        backgroundColor: '#fee2e2', 
        color: '#ef4444', 
        padding: '8px 16px', 
        borderRadius: '8px', 
        fontSize: '14px',
        fontWeight: '600'
      }}
    >
      🗑 삭제하기
    </button>
  );
};
