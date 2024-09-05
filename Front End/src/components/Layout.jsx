import React from "react";

function Layout({ children, sidebar, header }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      {/* Header Section */}
      <header className="bg-gray-900 text-white p-4">
        {header} {/* Render the header content here */}
      </header>

      {/* Main Layout */}
      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-800 p-4 pr-28">
          {sidebar} {/* Render the sidebar content here */}
        </aside>
        <main className="w-3/4 p-14 overflow-y-auto">
          {children} {/* Render the main content here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
