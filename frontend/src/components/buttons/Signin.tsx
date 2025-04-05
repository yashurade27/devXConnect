import { useNavigate } from "react-router-dom";



const SigninButton = () => {
    const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/signin")}
      className="relative w-[100px] h-[30px] flex items-center justify-center text-[16px] leading-[21px] rounded-xl px-6 py-2 font-dm-sans transition-transform duration-300 ease-in-out hover:scale-105"
      style={{
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient Border */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none border-animation"
        style={{
          padding: "1.5px",
          background: "linear-gradient(90deg, #4B0082, #001F54)", // Dark Purple to Dark Blue
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          transition: "all 0.3s ease-in-out",
        }}
      />

      <span
        className="transition-all duration-300 ease-in-out"
        style={{
          background: "linear-gradient(91.79deg, #9282A8 0.63%, #FFFAFA 99.16%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Sign In
      </span>

      {/* Hover Effect for Outer Button & Animated Gradient Border */}
      <style>
        {`
          button:hover {
            box-shadow: 0px 0px 10px 2px rgba(75, 0, 130, 0.6), 0px 0px 10px 2px rgba(0, 31, 84, 0.6);
          }

          button:hover div {
            background: linear-gradient(270deg, #4B0082, #001F54, #4B0082);
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

export default SigninButton;
