import { useState, useEffect } from "react";
import { X, Plus, Trash2, Code, Github, ExternalLink, Linkedin, Mail, Phone, Calendar, Building } from "lucide-react";
import techOptions from "./hooks/techStackList";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [projectLinks, setProjectLinks] = useState<{url: string, title: string}[]>([{url: "", title: ""}]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectLinks: "",
    linkedIn: "",
    email: "",
    phone: "",
    year: "",
    division: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredTech = techOptions.filter(
    (tech) => tech.toLowerCase().includes(debouncedSearch.toLowerCase()) && !selectedTech.includes(tech)
  );

  const addTech = (tech: string) => {
    if (!selectedTech.includes(tech)) {
      setSelectedTech((prev) => [...prev, tech]);
      setSearch("");
    }
  };

  const removeTech = (tech: string) => {
    setSelectedTech((prev) => prev.filter((t) => t !== tech));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle project links changes
  const handleProjectLinkChange = (index: number, field: 'url' | 'title', value: string) => {
    const updatedLinks = [...projectLinks];
    updatedLinks[index][field] = value;
    setProjectLinks(updatedLinks);
  };

  const addProjectLink = () => {
    setProjectLinks([...projectLinks, {url: "", title: ""}]);
  };

  const removeProjectLink = (index: number) => {
    if (projectLinks.length > 1) {
      setProjectLinks(projectLinks.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a post.");
      navigate("/signin");
      return;
    }
    try {
      // Combine project links into a string format for the API
      const projectLinksString = projectLinks
        .filter(link => link.url.trim() !== "")
        .map(link => `${link.title || 'Project'}: ${link.url}`)
        .join(', ');

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/posts/create`,
        {
          ...formData,
          projectLinks: projectLinksString,
          techStack: selectedTech,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post created successfully:", response.data);
      navigate("/bulk"); // Navigate to BulkPage after successful creation
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-[#030014] to-[#0e0538] p-6">
      <div className="w-full max-w-3xl bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-500/20">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-4xl font-bold text-center mb-8">
          Create Your TechStack Profile
        </h2>
        
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          {/* Personal Information Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 shadow-inner">
            <h3 className="text-blue-300 text-xl font-semibold mb-4 flex items-center">
              <Code className="mr-2 h-5 w-5" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative w-full group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-3 px-4 text-lg transition-all"
                  placeholder=" "
                  required
                />
                <label className="absolute text-gray-400 text-sm left-4 -top-3 bg-gray-800 px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 transition-all">
                  Full Name
                </label>
              </div>
              
              <div className="relative w-full group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-3 px-4 text-lg transition-all"
                  placeholder=" "
                  required
                />
                <label className="absolute text-gray-400 text-sm left-4 -top-3 bg-gray-800 px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 transition-all flex items-center">
                  <Mail className="mr-1 h-4 w-4" /> Email
                </label>
              </div>
              
              <div className="relative w-full group">
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-3 px-4 text-lg transition-all"
                  placeholder=" "
                />
                <label className="absolute text-gray-400 text-sm left-4 -top-3 bg-gray-800 px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 transition-all flex items-center">
                  <Linkedin className="mr-1 h-4 w-4" /> LinkedIn
                </label>
              </div>
              
              <div className="relative w-full group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-3 px-4 text-lg transition-all"
                  placeholder=" "
                />
                <label className="absolute text-gray-400 text-sm left-4 -top-3 bg-gray-800 px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 transition-all flex items-center">
                  <Phone className="mr-1 h-4 w-4" /> Phone
                </label>
              </div>
              
              <div className="relative w-full group">
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-3 px-4 text-lg transition-all"
                  placeholder=" "
                />
                <label className="absolute text-gray-400 text-sm left-4 -top-3 bg-gray-800 px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 transition-all flex items-center">
                  <Calendar className="mr-1 h-4 w-4" /> Year
                </label>
              </div>
              
              <div className="relative w-full group">
                <input
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-3 px-4 text-lg transition-all"
                  placeholder=" "
                />
                <label className="absolute text-gray-400 text-sm left-4 -top-3 bg-gray-800 px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 transition-all flex items-center">
                  <Building className="mr-1 h-4 w-4" /> Division
                </label>
              </div>
            </div>
            
            <div className="mt-6 relative w-full group">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-3 px-4 text-lg transition-all min-h-32"
                placeholder=" "
                required
              />
              <label className="absolute text-gray-400 text-sm left-4 -top-3 bg-gray-800 px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 transition-all">
                Bio / Description
              </label>
            </div>
          </div>
          
          {/* Project Links Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 shadow-inner">
            <h3 className="text-blue-300 text-xl font-semibold mb-4 flex items-center">
              <Github className="mr-2 h-5 w-5" /> Project Links
            </h3>
            
            <div className="space-y-4">
              {projectLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="relative w-full md:col-span-1 group">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => handleProjectLinkChange(index, 'title', e.target.value)}
                        className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-2 px-3 text-base transition-all"
                        placeholder=" "
                      />
                      <label className="absolute text-gray-400 text-sm left-3 -top-2 bg-gray-800 px-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400 transition-all">
                        Project Title
                      </label>
                    </div>
                    
                    <div className="relative w-full md:col-span-2 group">
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleProjectLinkChange(index, 'url', e.target.value)}
                        className="peer w-full text-gray-200 bg-gray-700/40 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent py-2 px-3 text-base transition-all"
                        placeholder=" "
                      />
                      <label className="absolute text-gray-400 text-sm left-3 -top-2 bg-gray-800 px-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-400 transition-all flex items-center">
                        <ExternalLink className="mr-1 h-3 w-3" /> URL
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => removeProjectLink(index)}
                    className="p-2 bg-red-900/40 hover:bg-red-700/60 text-red-300 rounded-lg transition-colors"
                    disabled={projectLinks.length === 1}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addProjectLink}
                className="flex items-center justify-center w-full py-2 mt-3 bg-blue-900/30 hover:bg-blue-700/40 text-blue-300 rounded-lg transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Another Project
              </button>
            </div>
          </div>
          
          {/* Tech Stack Section */}
          <div className="bg-gray-800/50 rounded-xl p-6 shadow-inner">
            <h3 className="text-blue-300 text-xl font-semibold mb-4">Tech Stack</h3>
            
            <div className="relative w-full">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or add a tech..."
                className="w-full p-3 rounded-lg bg-gray-700/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {search && (
                <div className="mt-2 border border-gray-700 rounded-lg bg-gray-800 shadow-lg max-h-48 overflow-y-auto absolute w-full z-10">
                  {filteredTech.length > 0 ? (
                    filteredTech.map((tech) => (
                      <div
                        key={tech}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white border-b border-gray-700 last:border-b-0 transition-colors"
                        onClick={() => addTech(tech)}
                      >
                        {tech}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-400">No results found</div>
                  )}
                </div>
              )}
              
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedTech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md transition-all hover:shadow-lg hover:from-blue-500 hover:to-purple-500"
                  >
                    {tech}
                    <X 
                      className="w-4 h-4 cursor-pointer hover:text-red-300 transition-colors" 
                      onClick={() => removeTech(tech)} 
                    />
                  </span>
                ))}
                {selectedTech.length === 0 && (
                  <span className="text-gray-500 italic">Add technologies to your stack...</span>
                )}
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;