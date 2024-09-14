import { userPosts } from "../api/post.api.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner, UserPostCard } from "../components/index.js";

export default function AllPost() {
  const { userId } = useParams(); // Extract userId from the URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts for the specific user
        const response = await userPosts(userId);

        // Destructure the necessary data from the response
        const data = response.data; // Assuming response is the API response

        // Update the state with the fetched posts
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]); // Add userId as a dependency to re-fetch posts when userId changes

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return <div className="text-white text-center">Error: {error}</div>;

  return (
    <div className="bg-gray-800 py-8 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-md"
            >
              <UserPostCard post={post} /> {/* Pass slug inside post */}
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No posts available
          </p>
        )}
      </div>
    </div>
  );
}
