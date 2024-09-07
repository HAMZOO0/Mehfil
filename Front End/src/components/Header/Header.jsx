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
    <header class="fixed top-0 z-50 mx-auto flex w-full max-w-full items-center justify-between border-b-[1px] border-b-slate-300 bg-[#121212] p-4 text-white lg:px-10">
      <Link to="/">
        {" "}
        <div className="mb-6 text-center">
          {/* Logo with name "Mehfil" */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg">
              Mehfil
            </div>
          </div>
        </div>{" "}
      </Link>
      <div class="flex w-max flex-shrink-0 items-center justify-end gap-6">
        <span class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            class="h-8 w-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            ></path>
          </svg>
        </span>
        <span class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            class="h-8 w-8 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            ></path>
          </svg>
          <span className="absolute right-1 top-0 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-green-500 p-1 text-white"></span>
        </span>
        <button
          onClick={handleclick}
          className="hidden w-max items-center justify-center border-[1px] border-white p-3 text-center font-bold text-white md:inline-flex text-[20px]"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
export default Header;
