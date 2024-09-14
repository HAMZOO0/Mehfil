import { useState } from "react";
import { edit_user } from "../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Loader } from "./index.js";
import toast, { Toaster } from "react-hot-toast";

export default function EditProfile() {
  const navigate = useNavigate();
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
      formData.append("user_name", data.user_name || "");
      formData.append("Email", data.Email || "");
      formData.append("bio", data.bio || "");
      formData.append("links", data.links || "");

      const response = await edit_user(formData);
      toast.success("Profile updated successfully!");
      console.log(response);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.formData?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          {/* Logo with name "Mehfil" */}
          <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg">
            Mehfil
          </div>
        </div>

        <div className="mb-6 text-center text-xl sm:text-2xl font-semibold uppercase text-white">
          Edit Profile
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <Input
            id="user_name"
            name="user_name"
            type="text"
            label="Username"
            placeholder="Enter your username"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
            {...register("user_name")}
          />

          {/* Email */}
          <Input
            id="Email"
            name="Email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
            {...register("Email")}
          />

          {/* Bio */}
          <Input
            id="bio"
            name="bio"
            type="text"
            label="Bio"
            placeholder="Enter your Bio"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
            {...register("bio")}
          />

          {/* Links */}
          <Input
            id="links"
            name="links"
            type="text"
            label="Links"
            placeholder="Enter your links"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
            {...register("links")}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Update
          </button>

          {/* Loader */}
          <div className="py-5">{loading && <Loader />}</div>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
}
