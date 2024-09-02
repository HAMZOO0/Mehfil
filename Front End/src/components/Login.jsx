import { Input } from ".";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // For navigation
import { loginUser } from "../api/auth.api.js";
import toast from "react-hot-toast";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const onSubmit = async (data) => {
    setError(null);
    try {
      const response = await loginUser(data);
      console.log(data);
      toast.success("Login successful!"); // Show success message
      //navigate("/home"); // Redirect to home or another page after login
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      toast.error("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Login
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          Login to access your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Enter your username"
              label="Username"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="w-full p-3 border rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {error?.username && (
              <p className="text-red-500 text-xs mt-1">
                {error.username.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Enter your password"
              label="Password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {error?.password && (
              <p className="text-red-500 text-xs mt-1">
                {error.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 p-3 text-white font-bold rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Log in
          </button>
        </form>
        <p className="text-sm font-light text-gray-300 mt-4 text-center">
          Don’t have an account?{" "}
          <span className="cursor-pointer font-bold text-purple-400 hover:underline">
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
