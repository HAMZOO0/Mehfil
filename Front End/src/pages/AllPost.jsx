import { getAllPosts } from "../api/post.api.js";
import React, { useEffect, useState } from "react";
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
        const posts = data.Post; // Extract the Post array

        console.log(posts);

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
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
