import { useRef } from "react";

function CrearePostBox() {
  const fileInputRef = useRef(null);

  // Function to trigger file input click
  const handleIconClick = () => {
    fileInputRef.current.click(); // This triggers the file input click
    console.log("Click howa");
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    console.log("onchange howa");

    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle file upload logic here (e.g., send the file to the server)
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-700 rounded-lg p-4 text-white shadow-lg">
      {/* Avatar and input field */}
      <div className="flex items-center mb-4">
        <img
          className="aspect-square h-10 w-10 shrink-0 rounded-full object-cover"
          src="" // Provide the avatar image source
          alt="avatar"
        />
        <input
          placeholder="Type to add something"
          className="w-full bg-transparent p-2 text-white outline-none placeholder:text-gray-500 md:p-4"
        />
      </div>

      {/* Upload icon and send button */}
      <div className="flex gap-x-1 sm:gap-x-2">
        <button
          onClick={handleIconClick} // Trigger file input when icon is clicked
          className="flex shrink-0 items-center justify-center p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        {/* Hidden file input */}
        {/*  fileInputRef.current will point to this input element. */}
        <input
          type="file"
          ref={fileInputRef} // Connecting the ref to this input element
          onChange={handleFileChange} // This function will run when a file is selected
          style={{ display: "none" }} // Hide the input
        />

        <button className="flex shrink-0 items-center justify-center bg-[#ae7aff] p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-6 text-black"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CrearePostBox;
