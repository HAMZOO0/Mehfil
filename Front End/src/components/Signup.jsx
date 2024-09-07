import { useState } from "react";
import { registerUser } from "../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Loader } from "./index.js";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../Store/store.js";
import { Link } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useStore();

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
      console.log(response);
      setUser(response);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.formData?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#121212] text-white">
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-lg p-8 bg-[#1e1e1e] rounded-lg shadow-lg">
          <div className="mb-6 text-center">
            <div className="mb-6 text-center">
              {/* Logo with name "Mehfil" */}
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg">
                  Mehfil
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 text-center text-2xl font-semibold uppercase py-4">
            Register
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <!-- Username --> */}

            <Input
              id="user_name"
              name="user_name"
              type="text"
              label="Username*"
              placeholder="Enter your username"
              className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
              {...register("user_name", { required: "Username is required" })}
            />
            {errors.user_name && (
              <p className="text-red-600">{errors.user_name.message}</p>
            )}
            {/* <!-- Full Name --> */}

            <Input
              id="Full_name"
              name="Full_name"
              type="text"
              label="Full Name*"
              placeholder="Enter your full name"
              {...register("Full_name", { required: "Full name is required" })}
              className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
            />
            {errors.Full_name && (
              <p className="text-red-600">{errors.Full_name.message}</p>
            )}
            {/* <!-- Email --> */}

            <Input
              id="Email"
              name="Email"
              type="email"
              label="Email*"
              {...register("Email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
            />
            {errors.Email && (
              <p className="text-red-600">{errors.Email.message}</p>
            )}
            {/* <!-- Password --> */}

            <Input
              id="password"
              name="password"
              type="password"
              label="Password*"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
            />

            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            {/* bio  */}
            <Input
              id="bio"
              name="bio"
              type="bio"
              label="bio*"
              placeholder="Enter your Bio"
              {...register("bio")}
              className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
            />
            {/* links  */}
            <Input
              id="links"
              name="links"
              type="links"
              label="links*"
              placeholder="Enter your links"
              {...register("links")}
              className="mb-4 w-full rounded-lg border border-gray-600 bg-black px-3 py-2 text-white placeholder-gray-400"
            />
            {/* <!-- Avatar --> */}

            <Input
              id="avatar"
              name="avatar"
              label="Avatar"
              type="file"
              {...register("avatar", { required: "Avatar is required" })}
              className="mb-4 w-full bg-black"
            />
            {errors.avatar && (
              <p className="text-red-600">{errors.avatar.message}</p>
            )}
            {/* <!-- Submit Button --> */}
            <button
              type="submit"
              className="w-full bg-[#ae7aff] px-4 py-3 text-black rounded-lg hover:bg-[#9d6dff]"
            >
              Register
            </button>
            <div>
              <p className="text-center py-2 text-md">
                <Link to="/login"> Already have an account?</Link>
              </p>
            </div>

            <div className="py-5">{Loading && <Loader />}</div>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
}
