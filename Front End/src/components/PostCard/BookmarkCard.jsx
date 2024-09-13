import React, { useState, useEffect } from "react";
import { get_user } from "../../api/auth.api.js";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function BookmarkCard({ post }) {
  // Check if the createdAt date exists and is valid
  const createdAt = post?.post?.[0]?.createdAt ? new Date(post.post[0].createdAt) : null;

  // Format the createdAt date to "time ago" if valid
  const timeAgo = createdAt && !isNaN(createdAt.getTime())
    ? formatDistanceToNow(createdAt, { addSuffix: true })
    : "Unknown time";

  // Fallback image if post_img is not provided
  const Postimg = post?.post?.[0]?.post_img?.url || "/path/to/default-image.png";

  // Handle user data
  const [user_name, setUser_name] = useState("Unknown User");
  const [avatar, setAvatar] = useState("/path/to/default-avatar.png");

  useEffect(() => {
    const get_user_data = async () => {
      try {
        const current_user = await get_user(post?.post?.[0]?.owner);

        // Make sure we have valid user data before setting state
        if (current_user?.data?.[0]) {
          const userData = current_user.data[0];
          setAvatar(userData?.avatar?.url || "/path/to/default-avatar.png"); // Fallback avatar
          setUser_name(userData?.user_name || "Unknown User");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    get_user_data();
  }, [post]);

  return (
    <div className="w-screen max-w-3xl mx-auto bg-gray-700 rounded-lg p-4 text-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={avatar}
            alt="User Profile"
            className="w-14 h-14 rounded-full mr-4"
          />
          <div>
            <span className="block text-xl font-bold">{user_name}</span>
            <span className="block text-md text-gray-400">{timeAgo}</span>
          </div>
        </div>
        <div className="text-2xl">...</div>
      </div>

      <div className="mb-4">
        {/* Post Content */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{post?.post?.[0]?.title || "Untitled Post"}</h2>
          <p className="text-lg text-gray-300 mb-4">
            {post?.post?.[0]?.description || "No description available"}
          </p>
          {Postimg && (
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={Postimg}
                alt="Post"
                className="w-full h-auto max-h-64 object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4"></div>
      </div>
      {/* Comments Section */}
    </div>
  );
}
