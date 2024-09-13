import { getAllBookmarks } from "../api/bookmark.api.js";
import React, { useEffect, useState } from "react";
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
console.log("bookmark.jsx repsence -->",response);

        // Destructure the necessary data from the response
        const { data } = response; // Assuming response is the API response

        const posts = Array.isArray(data) ? data : [];
        // Update the state with the fetched posts

        setPosts(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Add userId as a dependency to re-fetch posts when userId changes

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
          <div key={post.post[0]._id} className="mb-6">
            <BookmarkCard post={post} /> {/* Pass slug inside post */}
          </div>
        ))
      ) : (
        <p className="text-white text-center">No posts available</p>
      )}
    </div>
  );
}
