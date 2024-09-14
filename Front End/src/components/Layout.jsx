import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store.js";
import { useParams } from "react-router-dom";

function Layout({ children, sidebar, header, followbox }) {
  const navigate = useNavigate();
  const { user } = useStore();
  let id = user?._id || "";

  const { userId } = useParams();
  if (userId) {
    id = userId;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* Header Section */}
      <header className="bg-gray-900 text-white p-4">
        {header} {/* Render the header content here */}
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar Section - Hide on smaller screens */}
        <aside className="hidden lg:block w-full lg:w-1/4 bg-gray-800 p-4">
          {sidebar} {/* Render the sidebar content here */}
        </aside>

        {/* Main Content Section */}
        <main className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center overflow-y-auto">
          {children} {/* Render the main content here */}
        </main>

        {/* FollowBox Section - Hide on smaller screens */}
        <aside className="hidden lg:block w-full lg:w-1/4 bg-gray-800 p-4">
          {followbox} {/* Render the FollowBox content here */}
        </aside>
      </div>

      {/* Footer Navigation - Show on small screens only */}
      <div className="lg:hidden fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button
            onClick={() => navigate("/")}
            data-tooltip-target="tooltip-home"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="sr-only">Home</span>
          </button>

          {/* Other footer buttons */}
          <button
            onClick={() => navigate("/follow")}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="sr-only">Follow</span>
          </button>

          <div className="flex items-center justify-center">
            <button
              onClick={() => navigate("/CreatePost")}
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
              <span className="sr-only">New Post</span>
            </button>
          </div>

          <button
            onClick={() => navigate("/profile/edit-profile")}
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
            <span className="sr-only">Edit Profile</span>
          </button>

          <button
            onClick={() => navigate(`/profile/${id}`)}
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span className="sr-only">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Layout;
