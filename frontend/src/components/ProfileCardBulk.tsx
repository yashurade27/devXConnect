import Like from "./Like"; // Adjusted the path to match the correct location
import Save from "./Save";

export interface ProfileCardProps {
  id: string; // Ensure id is a string
  name: string;
  year: string; // Ensure year is a string
  techStack: string[];
}

const ProfileCardBulk = ({ id, name, year, techStack }: ProfileCardProps) => {
  return (
    <div
      id={`profile-card-${id}`} // Use id in the DOM for unique identification
      className="relative w-[350px] h-[180px] bg-gradient-to-b from-blue-300 to-purple-400 shadow-lg rounded-xl flex flex-col items-center justify-center text-center p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
    >
      {/* Profile Image - Half Inside, Half Outside */}
      <div className="absolute -top-12 w-24 h-24 rounded-full overflow-hidden shadow-lg">
        <img 
          src="/profileBulk.png"
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Name */}
      <h2 className="mt-12 font-extrabold text-lg text-gray-900">{name}</h2>

      {/* Year */}
      <p className="text-gray-700 text-sm font-medium">Year: {year}</p>

      {/* Tech Stack */}
      <p className="text-purple-950 text-sm mt-2 font-medium">
        {techStack.join(", ")}
      </p>

      {/* Like & Save Buttons */}
      <div className="flex flex-row items-center justify-center gap-20 mt-1">
        <Like/>
        <Save/>
      </div>
    </div>
  );
};

export default ProfileCardBulk;