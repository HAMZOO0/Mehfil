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
        
        {/* FollowBox Section - Show on mobile devices */}
        <aside className="lg:hidden fixed top-0 left-0 w-full bg-gray-800 p-4 z-40">
          {followbox} {/* Render the FollowBox content here */}
        </aside>

        {/* FollowBox Section - Hide on mobile devices */}
        <aside className="hidden lg:block w-full lg:w-1/4 bg-gray-800 p-4">
          {followbox} {/* Render the FollowBox content here */}
        </aside>
      </div>

      {/* Footer Navigation - Show on small screens only */}
      <div className="lg:hidden fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-900 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          {/* Footer buttons here */}
        </div>
      </div>
    </div>
  );
}

export default Layout;
