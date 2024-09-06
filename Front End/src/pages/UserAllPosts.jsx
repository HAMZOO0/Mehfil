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
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-800 py-14 pr-14">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.slug} className="mb-6">
            <UserPostCard post={post} /> {/* Pass slug inside post */}
          </div>
        ))
      ) : (
        <p className="text-white text-center">No posts available</p>
      )}
    </div>
  );
}
