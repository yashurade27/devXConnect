import { useState } from 'react';

const Like = () => {
  const [liked, setLiked] = useState(false);
  
  const toggleLike = () => {
    setLiked(!liked);
    // Here you would typically call an API to update the like status
  };
  
  return (
    <svg 
      onClick={toggleLike}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill={liked ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="2" 
      className="cursor-pointer"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
};

export default Like;
