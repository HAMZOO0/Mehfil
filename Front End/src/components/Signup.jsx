import { useState } from "react";
import { registerUser } from "../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Loader } from "./index.js";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../Store/store.js";
import { Link } from "react-router-dom";
import Banner from "./Banner.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      // Append text fields
      formData.append("user_name", data.user_name);
      formData.append("Full_name", data.Full_name);
      formData.append("Email", data.Email);
      formData.append("password", data.password);
      formData.append("bio", data.bio);
      formData.append("links", data.links);

      // Append the file
      formData.append("avatar", data.avatar[0]); // Assuming `data.avatar` is an array

      const response = await registerUser(formData);
      toast.success("Registration successful!");
      setUser(response.data);

      navigate("/");
    } catch (error) {
      toast.error(error?.response?.formData?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-800 text-white flex flex-col">
      <Banner />
      <div className="py-24 flex flex-1 items-center justify-center  sm:p-6 lg:p-8">
        <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg">
          <div className="mb-6 text-center">
            {/* Logo with name "Mehfil" */}
            <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg">
              Mehfil
            </div>
          </div>
          <div className="mb-6 text-center text-xl sm:text-2xl font-semibold uppercase py-4">
            Register
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <Input
              id="user_name"
              name="user_name"
              type="text"
              label="Username*"
              placeholder="Enter your username"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              {...register("user_name", { required: "Username is required" })}
            />
            {errors.user_name && (
              <p className="text-red-400 text-sm">{errors.user_name.message}</p>
            )}
            {/* Full Name */}
            <Input
              id="Full_name"
              name="Full_name"
              type="text"
              label="Full Name*"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              {...register("Full_name", { required: "Full name is required" })}
            />
            {errors.Full_name && (
              <p className="text-red-400 text-sm">{errors.Full_name.message}</p>
            )}
            {/* Email */}
            <Input
              id="Email"
              name="Email"
              type="email"
              label="Email*"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              {...register("Email", { required: "Email is required" })}
            />
            {errors.Email && (
              <p className="text-red-400 text-sm">{errors.Email.message}</p>
            )}
            {/* Password */}
            <Input
              id="password"
              name="password"
              type="password"
              label="Password*"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
            {/* Bio */}
            <Input
              id="bio"
              name="bio"
              type="text"
              label="Bio*"
              placeholder="Enter your bio"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              {...register("bio")}
            />
            {/* Links */}
            <Input
              id="links"
              name="links"
              type="text"
              label="Links*"
              placeholder="Enter your links"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              {...register("links")}
            />
            {/* Avatar */}
            <Input
              id="avatar"
              name="avatar"
              label="Avatar"
              type="file"
              className="mb-4 w-full bg-gray-800 text-white"
              {...register("avatar", { required: "Avatar is required" })}
            />
            {errors.avatar && (
              <p className="text-red-400 text-sm">{errors.avatar.message}</p>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Register
            </button>
            <div className="text-center py-2 text-md">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-purple-400 hover:underline">
                  Login
                </Link>
              </p>
            </div>
            {/* Loader */}
            <div className="py-5">{loading && <Loader />}</div>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
}
