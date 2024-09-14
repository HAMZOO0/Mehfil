// src/pages/AllPost.js
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
        // Fetch data from the API
        const response = await getAllPosts();
        // Destructure the necessary data from the response
        const { data } = response; // Assuming response is the API response
        const posts = Array.isArray(data.Post) ? data.Post : []; // Ensure posts is an array
        // Update the state with the fetched posts
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
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No posts available</p>
        )}
      </div>
    </div>
  );
}
