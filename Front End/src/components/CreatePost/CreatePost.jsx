import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { uploadPost } from "../../api/post.api";
import { useStore } from "../../Store/store.js";
function CrearePostBox() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [postConetent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useStore();
  const avatart = user?.avatar?.url || "";

  const fileInputRef = useRef(null);
  // Function to trigger file input click
  const handleIconClick = () => {
    fileInputRef.current?.click(); // This triggers the file input click
    console.log("fileInputRef.current ", fileInputRef);
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    console.log("onchange ");
    const file = e.target.files[0];
    console.log("Selected file:", file);
    toast.success("File uploaded successfully");

    // here we set file
    setSelectedFile(file);
  };

  // here we handle apis
  const handlePostClick = async () => {
    setLoading(true);
    const formData = new FormData();
    // Append text fields
    formData.append("title", postConetent);
    formData.append("post_img", selectedFile);

    const response = await uploadPost(formData);
    console.log(response);
    setLoading(false);
    setSelectedFile(null);
    setPostContent("");
    toast.success("Post created successfully");
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg p-4 mt-4 ml-48 text-white shadow-lg">
      {/* Avatar and input field */}
      <div className="flex items-center mb-4">
        <img
          className="aspect-square h-10 w-10 shrink-0 rounded-full object-cover"
          src={avatart}
          alt="avatar"
        />
        <input
          type="text"
          value={postConetent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Create Post here"
          className="w-full bg-transparent p-2 text-white outline-none placeholder:text-gray-500 md:p-4 text-2xl"
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
        {/* upload post  button  */}
        <button
          onClick={handlePostClick}
          className="flex shrink-0 items-center justify-center bg-[#ae7aff] p-1"
        >
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
        <Toaster position="bottom-left" reverseOrder={false} />
        {loading && <Toaster position="bottom-left" reverseOrder={false} />}
      </div>
    </div>
  );
}

export default CrearePostBox;

/*
useRef(null): Starts as null and will be attached to an element later.

ref={fileInputRef}: Tells React to attach the reference to the specific input element.

fileInputRef.current: Points to the input element in the DOM after it's rendered.

fileInputRef.current.click(): Simulates a user click on the input, opening the file picker.
 */
