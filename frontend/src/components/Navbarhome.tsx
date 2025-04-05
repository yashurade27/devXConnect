import { useState, useEffect } from "react";
import Logo from "./Logo";
import Search from "./Search";
import Like from "./Like";
import Save from "./Save";
import { PlusCircle, Eye, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface NavbarhomeProps {
  id: number;
  name: string;
  year: number;
  techStack: string[];
}

export function Navbarhome({}: NavbarhomeProps) {
  const [hasCreatedCard, setHasCreatedCard] = useState(false);
  const [postId, setPostId] = useState<number | null>(null); // Added to store the post ID
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has created a card
    const checkUserStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token && window.location.pathname !== "/bulk") {
        // User is not logged in, redirect to signup unless on /bulk
        setIsLoggedIn(false);
        setLoading(false);
        navigate("/signup");
        return;
      }

      // User is logged in
      setIsLoggedIn(true);

      try {
        // Get user ID from token
        const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
        if (payload && payload.id) {
          // Fetch all posts and check if any match the user's ID
          const postsResponse = await axios.get(
            `${BACKEND_URL}/api/v1/posts/all`
          );

          // Check if any posts belong to the current user
          const userPosts = postsResponse.data.filter(
            (post: { userId: any }) => post.userId === payload.id
          );

          // If user has posts, set hasCreatedCard to true and save the first post's ID
          if (userPosts.length > 0) {
            setHasCreatedCard(true);
            setPostId(userPosts[0].id); // Store the post ID, not the user ID
          }
        }
      } catch (error) {
        console.error("Error checking user card:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [navigate]);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#030014] shadow-md h-[60px] border-b border-gray-700 flex justify-between items-center px-6 py-2 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Middle section - Conditional Button */}
      <div className="flex items-center">
        {loading ? (
          <div className="px-4 py-2 bg-gray-800/70 text-gray-300 rounded-lg animate-pulse flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-gray-300 animate-spin"></div>
            <span className="font-medium text-sm">Loading...</span>
          </div>
        ) : isLoggedIn ? (
          hasCreatedCard ? (
            <Link
              to={`/profile/${postId}`}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-100 rounded-lg hover:from-indigo-800 hover:to-purple-800 shadow-lg border border-indigo-700/30 transition-all duration-300 backdrop-blur-sm"
            >
              <Eye className="h-4 w-4 text-indigo-300" />
              <span className="font-medium text-sm tracking-wide">
                View Your Card
              </span>
            </Link>
          ) : (
            <Link
              to="/createpost"
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-100 rounded-lg hover:from-indigo-800 hover:to-purple-800 shadow-lg border border-indigo-700/30 transition-all duration-300 backdrop-blur-sm"
            >
              <PlusCircle className="h-4 w-4 text-indigo-300" />
              <span className="font-medium text-sm tracking-wide">
                Create Your Card
              </span>
            </Link>
          )
        ) : (
          <Link
            to="/signup"
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-100 rounded-lg hover:from-indigo-800 hover:to-purple-800 shadow-lg border border-indigo-700/30 transition-all duration-300 backdrop-blur-sm"
          >
            <LogIn className="h-4 w-4 text-indigo-300" />
            <span className="font-medium text-sm tracking-wide">Sign Up</span>
          </Link>
        )}
      </div>
      {/* Icons */}
      <div className="flex items-center gap-4">
        <button className="p-2 w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-800 transition">
          <Like  />
        </button>
        <button className="p-2 w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-800 transition">
          <Save  />
        </button>
        <Search />
      </div>
    </div>
  );
}

export default Navbarhome;
