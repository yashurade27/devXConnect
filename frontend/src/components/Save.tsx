import { useState } from 'react';

const Save = () => {
  const [saved, setSaved] = useState(false);
  
  const toggleSave = () => {
    setSaved(!saved);
    // Here you would typically call an API to update the save status
  };
  
  return (
    <svg 
      onClick={toggleSave}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill={saved ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="2" 
      className="cursor-pointer"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default Save;