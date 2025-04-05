import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarProfileView from "./NavbarProfileView";
import { BACKEND_URL } from "../config";

const ProfileView = () => {
  const { id } = useParams();

  interface Profile {
    image: string;
    name: string;
    year: string;
    techStack: string[];
    email?: string;
    phone?: string;
    linkedIn?: string;
    projectLinks?: string[];
  }

  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("ProfileView mounted! ID:", id);

    if (!id) {
      setError("Invalid profile ID!");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/posts/${id}`);
        console.log("API Response Status:", response.status);

        const data = await response.json();
        console.log("Fetched Profile Data:", data);

        if (!response.ok) throw new Error(data.message || "Failed to fetch");

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile. Please try again.");
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030014] to-[#0a0028] text-white flex flex-col items-center">
      <div className="w-full mb-8">
        <NavbarProfileView />
      </div>

      <div className="w-full max-w-2xl px-4 py-6">
        {error ? (
          <div className="mt-6 p-4 bg-red-900 bg-opacity-30 rounded-xl text-center">
            <div className="text-red-400 text-lg font-bold">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : profile ? (
          <div className="relative mt-6">
            {/* Decorative background elements - more subtle */}
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
            
            {/* Main profile card - improved contrast */}
            <div className="relative bg-gradient-to-br from-[#191444] to-[#3b1f67] shadow-2xl rounded-xl overflow-hidden">
              {/* Profile header with image - reduced height */}
              <div className="relative h-32 bg-gradient-to-r from-[#3a1f79] to-[#291c5a]">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white">
                    <img 
                      src={profile.image || "/profileBulk.png"} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Profile content - improved spacing */}
              <div className="pt-16 px-6 pb-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                  <p className="text-purple-200 text-base font-medium">{profile.year}</p>
                  
                  {/* Tech stack badges - more compact */}
                  <div className="mt-3 flex flex-wrap justify-center gap-1">
                    {profile.techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-[#2a1655] rounded-lg text-xs font-medium text-purple-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Contact info - improved contrast */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.email && (
                    <div className="bg-[#261a4d] p-3 rounded-lg flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#6937db] flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-purple-200">Email</p>
                        <p className="text-white text-sm font-medium">{profile.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {profile.phone && (
                    <div className="bg-[#261a4d] p-3 rounded-lg flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#6937db] flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-purple-200">Phone</p>
                        <p className="text-white text-sm font-medium">{profile.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {profile.linkedIn && (
                    <div className="bg-[#261a4d] p-3 rounded-lg flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#6937db] flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-purple-200">LinkedIn</p>
                        <a 
                          href={profile.linkedIn} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Project Links Section - improved visibility */}
                {profile.projectLinks && profile.projectLinks.length > 0 && (
                  <div className="mt-6 bg-[#261a4d] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Projects</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {profile.projectLinks.map((link, index) => (
                        <a 
                          key={index}
                          href={link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-[#1d1341] hover:bg-[#2a1c57] rounded-lg transition-all flex items-center group"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#6937db] flex items-center justify-center mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-green-300 group-hover:text-green-200 text-sm font-medium break-all transition-colors">
                            {link.length > 35 ? `${link.substring(0, 35)}...` : link}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-purple-500 rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-400 text-base">Loading profile...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;