import { Input } from ".";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api.js";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../Store/store.js";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, isAuthenticated } = useStore();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      toast.success("Login successful!");

      setUser(response);
      console.log(response);

      navigate("/");
    } catch (error) {
      console.log("error", error);

      toast.error("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Enter your Email"
              label="Email"
              id="Email"
              {...register("Email", { required: "Email is required" })}
              className="w-full p-3 border rounded-md bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
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
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 p-3 text-white font-bold rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Log in
          </button>
          <div>
            <hr />
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-purple-600 p-3 text-white font-bold rounded-md shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Create Account
            </button>
          </div>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
}
