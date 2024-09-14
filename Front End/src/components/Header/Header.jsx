import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutUser } from "../../api/auth.api";
import { useStore } from "../../Store/store.js";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const handleclick = async () => {
    await logout();
    await logoutUser();
  };

  return (
    <header className="relative md:fixed top-0 z-50 w-full bg-[#121212] border-b border-b-slate-300 p-4 text-white flex items-center justify-between lg:px-10">
      <Link to="/" className="flex items-center">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg">
          Mehfil
        </div>
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="hidden md:block h-10 w-full max-w-xs px-4 pr-10 rounded-lg border shadow-sm bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-80 lg:w-96"
      />

      <div className="flex items-center gap-4 md:gap-6">
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full hover:bg-gray-700 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 50 50"
            className="text-white transition-transform duration-300 hover:scale-110"
          >
            <path d="M 24.96 1.05 A 1 1 0 0 0 24.38 1.26 L 1.38 19.21 A 1 1 0 0 0 2.61 20.79 L 4 19.71 V46 A 1 1 0 0 0 5 47 H 18.83 A 1 1 0 0 0 19.16 47 H 30.83 A 1 1 0 0 0 31.16 47 H 45 A 1 1 0 0 0 46 46 V19.71 L 47.38 20.79 A 1 1 0 1 0 48.61 19.21 L 41 13.27 V6 H 35 V8.58 L 25.61 1.26 A 1 1 0 0 0 24.96 1.05 z M 25 3.32 L 44 18.15 V45 H 32 V26 H 18 V45 H 6 V18.15 L 25 3.32 z M 37 8 H 39 V11.71 L 37 10.15 V8 z M 20 28 H 30 V45 H 20 V28 z" />
          </svg>
        </button>

        {/* About Button */}
        <button
          onClick={() => navigate("/about")}
          className="p-2 rounded-full hover:bg-gray-700 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 50 50"
            className="text-white"
          >
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
          </svg>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleclick}
          className="hidden md:inline-flex items-center justify-center border border-white p-2 rounded-lg text-white font-bold text-base hover:bg-white hover:text-black transition duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
