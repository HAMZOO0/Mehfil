// src/components/Banner.js
import React from "react";

const Banner = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 text-center z-50 md:hidden">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <p className="text-sm md:text-base">
          We use third-party cookies. Plese allow third-party cookies in your
          setting
          <span className="text-red-500">
            . Otherwise, it may cause problems.
          </span>{" "}
        </p>
        <button
          className="text-xl focus:outline-none"
          onClick={() => {
            // Hide the banner
            document.getElementById("cookie-banner").style.display = "none";
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Banner;
