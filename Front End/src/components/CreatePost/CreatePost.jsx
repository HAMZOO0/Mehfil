import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { uploadPost } from "../../api/post.api";
import { useStore } from "../../Store/store.js";
import { Loader } from "../index.js";

function CreatePostBox() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useStore();
  const avatar = user?.avatar?.url || "";

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      toast.success("File selected successfully");
    }
  };

  const handlePostClick = async () => {
    if (!postContent && !selectedFile) {
      toast.error("Please add content or an image to create a post.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", postContent);
    formData.append("post_img", selectedFile);

    try {
      await uploadPost(formData);
      toast.success("Post created successfully");
      // Update the posts without reloading the page (can add logic here)
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setSelectedFile(null);
      setPostContent("");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg p-4 mt-4 text-white shadow-lg">
      <div className="flex items-center mb-4">
        <img
          className="aspect-square h-10 w-10 shrink-0 rounded-full object-cover"
          src={avatar}
          alt="avatar"
        />
        <input
          type="text"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Create Post here"
          className="w-full bg-transparent p-2 text-white outline-none placeholder:text-gray-500 text-lg md:text-2xl"
        />
      </div>

      <div className="flex gap-x-2">
        <button
          onClick={handleIconClick}
          className="flex shrink-0 items-center justify-center p-1 md:p-2"
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button
          onClick={handlePostClick}
          className="flex shrink-0 items-center justify-center bg-[#ae7aff] p-1 md:p-2"
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
      </div>

      <Toaster position="bottom-left" reverseOrder={false} />
      {loading && <Loader />}
    </div>
  );
}

export default CreatePostBox;
