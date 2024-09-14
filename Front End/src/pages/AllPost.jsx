import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api/post.api.js";
import { LoadingSpinner, PostCard } from "../components/index.js";

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        const { data } = response; // Assuming response is the API response
        const posts = Array.isArray(data.Post) ? data.Post : []; // Ensure posts is an array
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
      <div className="max-w-4xl mx-auto">
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-4 sm:p-6 bg-gray-700 rounded-lg shadow-md"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No posts available</p>
        )}
      </div>
    </div>
  );
}
