'use client';

import React, { useState } from 'react';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  initialLiked: boolean;
  viewCount: number; // 조회수 추가
}

export const LikeButton = ({ postId, initialLikes, initialLiked, viewCount }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = async () => {
    const res = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
    if (res.status === 401) {
      alert('좋아요를 누르려면 로그인이 필요합니다.');
      return;
    }
    
    if (res.ok) {
      const data = await res.json();
      setLikes(data.count);
      setLiked(data.liked);
    } else {
      console.error('Like toggle failed');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <button 
        onClick={toggleLike}
        style={{ 
          padding: '10px 24px', 
          background: liked ? 'var(--primary)' : 'white', 
          color: liked ? 'white' : 'var(--primary)',
          border: `2px solid var(--primary)`,
          borderRadius: '12px',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseOver={(e) => {
          if (!liked) {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
          }
        }}
        onMouseOut={(e) => {
          if (!liked) {
            e.currentTarget.style.backgroundColor = 'white';
          }
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>{liked ? '❤️' : '🤍'}</span>
        좋아요 {likes}
      </button>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px', 
        color: 'var(--text-muted)',
        fontSize: '1.1rem',
        fontWeight: '600'
      }}>
        <span style={{ fontSize: '1.3rem' }}>👁</span>
        {viewCount}
      </div>
    </div>
  );
};
