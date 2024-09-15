import React from "react";
import { Header } from "../components";
const About_page = () => {
  return (
    <>
      <Header />
      <div className="py-14 min-h-screen bg-gray-50 text-gray-800">
        <header className="bg-[#121212] text-white py-6">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-center">About Mehfil</h1>
          </div>
        </header>
        <main className="container mx-auto px-6 py-10">
          {/* Project Overview */}
          <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold mb-4 text-[#121212]">
              Welcome to Mehfil
            </h2>
            <p className="text-lg mb-6">
              Mehfil is a cutting-edge social media application crafted with the
              MERN stack. Designed to deliver an engaging and seamless social
              experience, this beta version is ready for you to explore. Your
              feedback is crucial to help us enhance the app!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">
                  Technologies Used:
                </h3>
                <ul className="list-disc list-inside text-lg">
                  <li>
                    <strong>Frontend:</strong> React.js, Tailwind CSS,
                    @mui/material
                  </li>
                  <li>
                    <strong>Backend:</strong> Node.js, Express.js
                  </li>
                  <li>
                    <strong>Database:</strong> MongoDB
                  </li>
                  <li>
                    <strong>State Management:</strong> Zustand
                  </li>
                  <li>
                    <strong>Real-Time Updates:</strong> Custom implementation
                  </li>
                  <li>
                    <strong>Hosting:</strong> Vercel
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">
                  Estimated Development Time:
                </h3>
                <p className="text-lg">
                  Approximately 2 months, including planning, development,
                  testing, and deployment.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-12 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#121212]">
              Features
            </h2>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>🔐 Authentication: Secure user sign-in and registration</li>
              <li>
                📰 Social Feed: View and interact with posts from other users
              </li>
              <li>
                📱 Responsiveness: Fully optimized for mobile and desktop views
              </li>
              <li>
                💼 State Management: Efficient state handling with Zustand
              </li>
              <li>
                🔧 Custom Backend: Scalable backend support with Node.js and
                Express.js
              </li>
              <li>
                🔄 Realtime Data Updates: Stay updated with live changes through
                custom solutions
              </li>
              <li>
                ✍️ Post Creation: Engage with content through posts, likes, and
                comments
              </li>
              <li>
                📥 Fetching Data: Seamlessly retrieve posts, likes, and comments
              </li>
              <li>📝 Rich Text Editor: Enhanced text formatting for posts</li>
              <li>✏️ Edit/Delete: Manage your content with ease</li>
              <li>🔔 Notifications: Get instant updates on interactions</li>
              <li>👤 User Profiles: Personalize and manage your profile</li>
              <li>📜 Pagination: Efficient content navigation</li>
              <li>📂 File Uploading: Share images and videos easily</li>
              <li>📤 Media Sharing: Share your files across the platform</li>
              <li>
                🖼️ Image Caching: Enhanced performance for image-heavy content
              </li>
              <li>🖌️ SVG Icons: Crisp and scalable icons for the UI</li>
              <li>
                📱🖥️ Cross-Platform Compatibility: Works on Android, iOS, and
                web
              </li>
            </ul>
          </section>

          {/* Developer Info */}
          <section className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#121212]">
              About the Developer
            </h2>
            <p className="text-lg mb-4">
              Developed by Hamza Sajid, a dedicated developer with a passion for
              creating innovative web solutions. Discover more about my work and
              projects on my{" "}
              <a
                href="https://personal-portfolio-phi-mocha.vercel.app/"
                className="text-blue-600 hover:underline"
              >
                personal portfolio
              </a>{" "}
              or connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/hamza-sajid-developer/"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
              .
            </p>
            <p className="text-lg">
              I welcome any feedback or suggestions to improve Mehfil. Your
              input is invaluable in refining and enhancing the app.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default About_page;
