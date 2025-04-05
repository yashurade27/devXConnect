import Like from "../Like";
import Save from "../Save";

const ProfileCard = () => {
  return (
    <div className="relative w-[350px] h-[180px] bg-gradient-to-b from-blue-300 to-purple-400 shadow-lg rounded-xl flex flex-col items-center justify-center text-center p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      {/* Profile Image - Half Inside, Half Outside */}
      <div className="absolute -top-12 w-24 h-24 rounded-full overflow-hidden shadow-lg">
        <img 
          src="/profile_yash.jpg"
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Name */}
      <h2 className="mt-12 font-extrabold text-lg text-gray-900">Yash Urade</h2>

      {/* Year */}
      <p className="text-gray-700 text-sm font-medium">2027</p>

      {/* Tech Stack */}
      <p className="text-purple-950 text-sm mt-2 font-medium">
        TypeScript, React, Node.js, MongoDB, Express.js, Hono, TailWind, C++, Cloudflare, Netlify, Prisma
      </p>

      {/* Like & Save Buttons */}
      <div className="flex flex-row items-center justify-center gap-20 mt-1">
        <Like />
        <Save />
      </div>
    </div>
  );
};

export default ProfileCard;
