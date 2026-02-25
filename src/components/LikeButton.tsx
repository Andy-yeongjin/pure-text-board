'use client';

import React, { useState } from 'react';

export const LikeButton = ({ postId, initialLikes, initialLiked }: { postId: number, initialLikes: number, initialLiked: boolean }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = async () => {
    const res = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      setLikes(data.count);
      setLiked(data.liked);
    }
  };

  return (
    <button 
      onClick={toggleLike}
      style={{ 
        padding: '10px 20px', 
        background: liked ? 'red' : 'white', 
        color: liked ? 'white' : 'black',
        border: '1px solid #ccc',
        borderRadius: '5px'
      }}
    >
      ❤ {likes}
    </button>
  );
};
