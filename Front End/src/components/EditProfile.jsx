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
  const [Loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_name", data.user_name || "");
      formData.append("Email", data.Email || "");
      formData.append("bio", data.bio || "");
      formData.append("links", data.links || "");

      const response = await edit_user(formData);
      toast.success("Registration successful!");
      console.log(response);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.formData?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[900px] flex items-center justify-center bg-gray-700 text-white">
      <div className="w-full max-w-lg p-8 bg-[#1e1e1e] rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          {/* Logo with name "Mehfil" */}
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg">
              Mehfil
            </div>
          </div>
        </div>

        <div className="mb-6 text-center text-2xl font-semibold uppercase">
          Edit Profile
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <Input
            id="user_name"
            name="user_name"
            type="text"
            label="Username"
            placeholder="Enter your username"
            className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
            {...register("user_name")}
          />

          {/* Email */}
          <Input
            id="Email"
            name="Email"
            type="email"
            label="Email"
            {...register("Email")}
            placeholder="Enter your email"
            className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
          />

          {/* Bio */}
          <Input
            id="bio"
            name="bio"
            type="bio"
            label="Bio"
            placeholder="Enter your Bio"
            {...register("bio")}
            className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
          />

          {/* Links */}
          <Input
            id="links"
            name="links"
            type="links"
            label="Links"
            placeholder="Enter your links"
            {...register("links")}
            className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#ae7aff] px-4 py-3 text-black rounded-lg hover:bg-[#9d6dff]"
          >
            Update
          </button>

          {/* Loader */}
          <div className="py-5">{Loading && <Loader />}</div>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
}
