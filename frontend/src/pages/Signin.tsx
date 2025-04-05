import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { signinInput } from "@yashuradepbl/common"; // Adjust the import path accordingly
import { z } from "zod";

export function Signin() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // Fade-in effect
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/bulk");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Validate input using zod schema
      signinInput.parse({ email, password });

      const response = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { token: responseText }; // Assume raw token if JSON parsing fails
      }

      if (data.token) {
        localStorage.setItem("token", data.token); // Store token in localStorage
        navigate("/bulk"); // Navigate to dashboard after successful sign-in
      } else {
        console.error("Sign-in failed: Token not found in response");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div
        className={`bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-700 ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Welcome Back!</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              placeholder="********"
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:scale-[1.02]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-900">Remember me</span>
            </label>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={() => navigate("/signup")}
            className="text-indigo-600 hover:text-indigo-500 font-medium transition-all"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
