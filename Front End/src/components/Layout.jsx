import React from "react";

function Layout({ children, sidebar, header, followbox }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* Header Section */}
      <header className="bg-gray-900 text-white p-4">
        {header} {/* Render the header content here */}
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar Section */}
        <aside className="w-full lg:w-1/4 bg-gray-800 p-4">
          {sidebar} {/* Render the sidebar content here */}
        </aside>

        {/* Main Content Section */}
        <main className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center overflow-y-auto">
          {children} {/* Render the main content here */}
        </main>

        {/* FollowBox Section */}
        <aside className="w-full lg:w-1/4 bg-gray-800 p-4">
          {followbox} {/* Render the FollowBox content here */}
        </aside>
      </div>
    </div>
  );
}

export default Layout;
