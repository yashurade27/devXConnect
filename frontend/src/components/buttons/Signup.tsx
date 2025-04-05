import { useNavigate } from "react-router-dom";
const SignupButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="relative w-auto h-[45px] flex items-center justify-center text-[18px] rounded-full px-5 py-2 font-dm-sans transition-transform duration-300 ease-in-out hover:scale-105"
      style={{
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={() => navigate("/signup")}
    >
      {/* Gradient Border */}
      <div
        
        className="absolute inset-0 rounded-full pointer-events-none border-animation"
        style={{
          padding: "2px",
          background: "linear-gradient(90deg, #6a11cb, #2575fc)", // Purple to Blue
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          transition: "all 0.3s ease-in-out",
        }}
      />

      <span
        className="transition-all duration-300 ease-in-out"
        style={{
          background: "linear-gradient(91.79deg, #b19cd9 0.63%, #ffffff 99.16%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "18px",
          fontWeight: "normal",
          padding: "5px 15px",
        }}
      >
        Sign Up
      </span>

      {/* Hover Effect for Outer Button & Animated Gradient Border */}
      <style>
        {`
          button:hover {
            box-shadow: 0px 0px 10px 2px rgba(106, 17, 203, 0.7), 0px 0px 10px 2px rgba(37, 117, 252, 0.7);
          }

          button:hover div {
            background: linear-gradient(270deg, #6a11cb, #2575fc, #6a11cb);
            animation: borderGlow 2s infinite linear;
          }

          @keyframes borderGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </button>
  );
};

export default SignupButton;
