import React, { useState } from "react";

const CreatePostForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission, e.g., send data to the server
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("File:", file);
    // Reset form
    setTitle("");
    setDescription("");
    setFile(null);
    setIsFormVisible(false);
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full bg-[#ae7aff] text-white py-2 px-4 rounded-md font-bold hover:bg-[#9c6cdb] transition-all duration-150"
        >
          Create Post
        </button>
      )}

      {isFormVisible && (
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-2 mb-2 focus:outline-none focus:border-[#ae7aff]"
            />
            <textarea
              placeholder="Enter your description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-2 mb-2 resize-none focus:outline-none focus:border-[#ae7aff]"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full mb-2"
            />
            <button
              type="submit"
              className="w-full bg-[#ae7aff] text-white py-2 px-4 rounded-md font-bold hover:bg-[#9c6cdb] transition-all duration-150"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePostForm;
