// src/pages/Bookmark.js
import React, { useEffect, useState } from "react";
import { getAllBookmarks } from "../api/bookmark.api.js";
import { LoadingSpinner, BookmarkCard } from "../components/index.js";

export default function Bookmark() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts for the specific user
        const response = await getAllBookmarks();
        // Destructure the necessary data from the response
        const { data } = response; // Assuming response is the API response
        const posts = Array.isArray(data) ? data : []; // Ensure posts is an array

        // Check if the first post exists and log its ID
        if (posts.length > 0 && posts[0].post.length > 0) {
        }

        setPosts(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-white bg-red-600 py-4 px-6 rounded-md">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-gray-800 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post, index) =>
              post.post.length > 0 ? ( // Ensure post array is not empty
                <div
                  key={post.post[0]._id || index} // Use index as fallback if post[0]._id is missing
                  className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <BookmarkCard post={post.post[0]} />{" "}
                  {/* Pass the first post */}
                </div>
              ) : (
                <div key={index} className="text-white text-center">
                  No post available
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-white text-center">No bookmarks available</p>
        )}
      </div>
    </div>
  );
}
