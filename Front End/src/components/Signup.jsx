import { useState } from "react";
import { registerUser } from "../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Loader } from "./index.js";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../Store/store.js";
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
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-lg p-8 bg-[#1e1e1e] rounded-lg shadow-lg">
          <div className="mb-6 text-center">
            <svg
              className="mx-auto w-16 h-16 mb-4"
              viewBox="0 0 63 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.25 47.458C55.9485 38.7595 55.9485 24.6565 47.25 15.958C38.5515 7.25952 24.4485 7.25952 15.75 15.958C7.05151 24.6565 7.05151 38.7595 15.75 47.458C24.4485 56.1565 38.5515 56.1565 47.25 47.458Z"
                stroke="#E9FCFF"
                strokeWidth="1.38962"
                strokeMiterlimit="10"
              ></path>
              <path
                d="M10.5366 47.7971V17.5057C10.5366 16.9599 11.1511 16.6391 11.599 16.9495L33.4166 32.0952C33.8041 32.3639 33.8041 32.9368 33.4166 33.2076L11.599 48.3533C11.1511 48.6657 10.5366 48.3429 10.5366 47.7971Z"
                stroke="url(#paint0_linear_53_10115)"
                strokeWidth="6.99574"
                strokeMiterlimit="10"
                strokeLinecap="round"
              ></path>
              <path
                d="M18.1915 27.6963C20.1641 27.6963 21.7285 28.7066 21.7285 30.9021C21.7285 33.0976 20.1621 34.2433 18.1915 34.2433H16.8854V37.8677H14.1733V27.6984H18.1915V27.6963Z"
                fill="#E9FCFF"
              ></path>
              <path
                d="M25.2053 27.6963V35.4868H28.484V37.8657H22.4932V27.6963H25.2053Z"
                fill="#E9FCFF"
              ></path>
              <path
                d="M35.3142 27.6963L39.4553 37.8657H36.5328L35.9162 36.1763H32.1939L31.5773 37.8657H28.6548L32.7959 27.6963H35.3101H35.3142ZM34.9143 33.5663L34.2144 31.7832C34.1582 31.6395 33.954 31.6395 33.8978 31.7832L33.1979 33.5663C33.1541 33.6767 33.2354 33.7975 33.3562 33.7975H34.756C34.8747 33.7975 34.958 33.6767 34.9143 33.5663Z"
                fill="#E9FCFF"
              ></path>
              <path
                d="M40.9491 27.6963L42.8592 30.5188L44.7694 27.6963H48.0355L44.2132 33.2559V37.8657H41.5011V33.2559L37.6787 27.6963H40.9449H40.9491Z"
                fill="#E9FCFF"
              ></path>
              <path
                d="M16.894 32.1396V29.9129C16.894 29.8212 16.9982 29.7671 17.0732 29.8191L18.6771 30.9315C18.7417 30.9773 18.7417 31.0731 18.6771 31.1189L17.0732 32.2313C16.9982 32.2834 16.894 32.2313 16.894 32.1375V32.1396Z"
                fill="#232323"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_53_10115"
                  x1="2.23416"
                  y1="20.3361"
                  x2="26.863"
                  y2="44.9649"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#007EF8"></stop>
                  <stop offset="1" stopColor="#FF4A9A"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mb-6 text-center text-2xl font-semibold uppercase">
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
            <div className="py-5">{Loading && <Loader />}</div>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
}
