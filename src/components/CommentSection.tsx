'use client';

import React, { useState } from 'react';

interface Comment {
  id: number;
  content: string;
  isDeleted: boolean;
  author: { name: string };
  createdAt: string;
}

export const CommentSection = ({ postId, initialComments }: { postId: number, initialComments: Comment[] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content: newComment }),
      });

      if (res.ok) {
        const added = await res.json();
        setComments([...comments, added]);
        setNewComment('');
      } else if (res.status === 401) {
        alert('댓글을 작성하려면 로그인이 필요합니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;
    
    const res = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
    if (res.ok) {
      setComments(comments.map(c => c.id === commentId ? { ...c, isDeleted: true } : c));
    }
  };

  return (
    <div style={{ marginTop: '50px', borderTop: '2px solid var(--border-color)', paddingTop: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.4rem', margin: 0, fontWeight: '800', color: 'var(--text-main)' }}>
          댓글 <span style={{ color: 'var(--primary)', marginLeft: '4px' }}>{comments.length}</span>
        </h3>
      </div>
      
      {/* 댓글 입력 영역 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <div className="card" style={{ padding: '20px', boxShadow: 'none', border: '2px solid var(--border-color)', transition: 'border-color 0.2s' }} 
             onFocusCapture={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
             onBlurCapture={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}>
          <textarea 
            placeholder="따뜻한 댓글을 남겨주세요..."
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            required 
            style={{ 
              width: '100%', 
              minHeight: '80px', 
              border: 'none', 
              outline: 'none', 
              resize: 'vertical',
              fontSize: '1rem',
              color: 'var(--text-main)',
              backgroundColor: 'transparent',
              padding: 0
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button 
              type="submit" 
              disabled={isLoading || !newComment.trim()}
              style={{ 
                padding: '10px 24px', 
                backgroundColor: isLoading ? 'var(--text-muted)' : 'var(--primary)', 
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: '700',
                borderRadius: '10px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
              }}
              onMouseOut={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = 'var(--primary)';
              }}
            >
              {isLoading ? '등록 중...' : '댓글 등록'}
            </button>
          </div>
        </div>
      </form>

      {/* 댓글 리스트 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {comments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} style={{ 
              display: 'flex', 
              gap: '16px', 
              paddingBottom: '24px', 
              borderBottom: '1px solid var(--border-color)',
              opacity: comment.isDeleted ? 0.6 : 1 
            }}>
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author.name}`} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', flexShrink: 0 }} 
                alt="avatar"
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>{comment.author.name}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div style={{ 
                  fontSize: '1rem', 
                  lineHeight: 1.6, 
                  color: comment.isDeleted ? 'var(--text-muted)' : '#334155',
                  fontStyle: comment.isDeleted ? 'italic' : 'normal'
                }}>
                  {comment.isDeleted ? '삭제된 댓글입니다.' : comment.content}
                </div>

                {!comment.isDeleted && (
                  <button 
                    onClick={() => handleDelete(comment.id)} 
                    style={{ 
                      marginTop: '10px', 
                      background: 'none', 
                      padding: 0, 
                      color: '#ef4444', 
                      fontSize: '0.85rem', 
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
