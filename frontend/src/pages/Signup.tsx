import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { signupInput } from "@yashuradepbl/common"; // Fixed import
import axios from "axios";

export function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<{ name: string; email: string; password: string }>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Clear any existing token before signing up
    localStorage.removeItem("token");
  
    try {
      signupInput.parse(formData);
  
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, formData);
  
      if (response.status === 200) {
        const token = response.data.token; // Ensure backend sends a token
        if (token) {
          localStorage.setItem("token", token); // Store the token
        }
        navigate("/signin");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div
        className={`bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-700 ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Create an Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Yash"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:scale-[1.02]"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="yash.urade_comp23@pccoer.in"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:scale-[1.02]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:scale-[1.02]"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            onClick={() => navigate("/signin")}
            className="text-indigo-600 hover:text-indigo-500 font-medium transition-all"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
