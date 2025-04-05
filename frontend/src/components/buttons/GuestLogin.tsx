import { useNavigate } from "react-router-dom";
const GuestLogin = () => {
  const navigate = useNavigate();
  return (
    <button
    onClick={() => navigate("/bulk")}
      className="font-dmSans text-[#CDCBFF] transition-all duration-300 ease-in-out 
      hover:text-purple-100 hover:border hover:border-[#5A3E85] 
      px-4 py-1 rounded-full focus:outline-none focus:ring-0 bg-transparent"
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
    >
      Guest
    </button>
  );
};

export default GuestLogin;
