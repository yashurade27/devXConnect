import { useState } from "react";

const Search = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative w-full max-w-xl p-0.5 rounded-full">
      <div className={`bg-gradient-to-r from-purple-500 to-indigo-500 p-0.5 rounded-full transition-all duration-200 ${isActive ? 'opacity-90' : 'opacity-100'}`}>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full px-4 py-1.5 border-none rounded-full bg-[#030014] text-purple-200 placeholder-gray-500 focus:outline-none"
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      </div>
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="6" stroke="#7000FF" strokeWidth="1.5" />
          <line x1="14" y1="14" x2="20" y2="20" stroke="#7000FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default Search;
