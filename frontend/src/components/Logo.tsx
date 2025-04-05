import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center">
      <div
      onClick={() => navigate("/bulk")}
        className="font-dm-sans font-bold text-[24px] leading-[31.25px] tracking-[-0.08em] text-center"
        style={{
          background: "linear-gradient(180deg, #CFADF9 -7.14%, #092381 109.52%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0px 4px 20.5px #0C203D",
        }}
      >
        devXConnect
      </div>
    </div>
  );
}

export default Logo;