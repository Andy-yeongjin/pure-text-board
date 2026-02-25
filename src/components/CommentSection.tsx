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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ postId, content: newComment }),
    });

    if (res.ok) {
      const added = await res.json();
      setComments([...comments, added]);
      setNewComment('');
    }
  };

  const handleDelete = async (commentId: number) => {
    const res = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
    if (res.ok) {
      setComments(comments.map(c => c.id === commentId ? { ...c, isDeleted: true } : c));
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>댓글</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          required 
          style={{ width: '100%', minHeight: '60px' }}
        />
        <button type="submit">댓글 등록</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} style={{ marginBottom: '10px' }}>
            <strong>{comment.author.name}</strong>: {comment.isDeleted ? <span style={{ color: '#999' }}>삭제된 댓글입니다.</span> : comment.content}
            {!comment.isDeleted && (
              <button onClick={() => handleDelete(comment.id)} style={{ marginLeft: '10px', fontSize: '12px' }}>삭제</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
