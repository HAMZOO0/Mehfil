import { useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center min-h-screen p-16 ${
          isDarkMode ? "bg-slate-900" : "bg-slate-200"
        }`}
      >
        <h1
          className={`my-10 font-medium text-3xl sm:text-4xl ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Follow Members
          <span
            className={`${isDarkMode ? "block" : "hidden"} day`}
            style={{ display: "inline-block" }}
          >
            ?
          </span>
          <span
            className={`${isDarkMode ? "hidden" : "block"} night`}
            style={{ display: "none" }}
          >
            ?
          </span>
        </h1>
        <div className="mb-4">
          <button
            className={`toggle-theme btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 ${
              isDarkMode
                ? "bg-[#6911e7] hover:bg-[#590acb]"
                : "bg-[#2d2d2d] hover:bg-[#1a1a1a]"
            } duration-300`}
            type="button"
            onClick={toggleTheme}
          >
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </div>
        <div className="user-list w-full max-w-lg mx-auto bg-white rounded-xl shadow-xl flex flex-col py-4">
          {/* User rows */}
          {[
            {
              name: "Wade Warren",
              role1: "Marketing Liaison",
              role2: "Coordinator",
              imgSrc: "https://randomuser.me/api/portraits/men/32.jpg",
            },
          ].map((user, index) => (
            <div
              key={index}
              className="user-row flex flex-col items-center justify-between cursor-pointer p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]"
            >
              <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                <div className="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                  <img
                    className="avatar w-20 h-20 rounded-full"
                    src={user.imgSrc}
                    alt={user.name}
                  />
                </div>
                <div className="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                  <a
                    href="#"
                    className={`title font-medium no-underline ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {user.name}
                  </a>
                  <div className="skills flex flex-col">
                    <span className="subtitle text-slate-500">
                      {user.role1}
                    </span>
                    <span className="subtitle text-slate-500">
                      {user.role2}
                    </span>
                  </div>
                </div>
              </div>
              <div className="user-option mx-auto sm:ml-auto sm:mr-0">
                <button
                  className={`btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 ${
                    isDarkMode
                      ? "bg-[#6911e7] hover:bg-[#590acb]"
                      : "bg-[#2d2d2d] hover:bg-[#1a1a1a]"
                  } duration-300`}
                  type="button"
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
          <a
            className={`show-more block w-10/12 mx-auto py-2.5 px-4 text-center no-underline rounded hover:bg-[#f6f8f9] font-medium duration-300 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            href="#/"
          >
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
