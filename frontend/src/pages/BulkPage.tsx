import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import ProfileCardBulk from "../components/ProfileCardBulk";
import Navbarhome from "../components/Navbarhome";

interface Post {
  id: string; // Ensure id is a string
  name: string;
  year: string; // Ensure year is a string
  techStack: string[];
}

const BulkPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/posts/all`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-[#030014] min-h-screen text-white flex flex-col items-center">
      <div className="mb-20">
        <Navbarhome id={0} name={""} year={0} techStack={[]} />
      </div>
      <div className="container mx-auto px-6 py-10 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {posts.map((post) => (
            <Link to={`/profile/${post.id}`} key={post.id} className="flex justify-center">
              <ProfileCardBulk
                id={post.id} // Ensure id is passed as a string
                name={post.name}
                year={post.year} // Ensure year is passed as a string
                techStack={post.techStack}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulkPage;