import React, { useState, useEffect } from "react";
import { get_user } from "../../api/auth.api.js";
import { formatDistanceToNow } from "date-fns";

export default function BookmarkCard({ post }) {
  // Check if the createdAt date exists and is valid
  const createdAt = post?.createdAt ? new Date(post.createdAt) : null;

  // Format the createdAt date to "time ago" if valid
  const timeAgo =
    createdAt && !isNaN(createdAt.getTime())
      ? formatDistanceToNow(createdAt, { addSuffix: true })
      : "Unknown time";

  // Fallback image if post_img is not provided
  const Postimg = post?.post_img?.url || "/path/to/fallback-image.png";

  // Handle user data
  const [user_name, setUser_name] = useState("Unknown User");
  const [avatar, setAvatar] = useState("/path/to/default-avatar.png");

  useEffect(() => {
    const get_user_data = async () => {
      try {
        const current_user = await get_user(post?.owner);

        // Set user data only if available
        if (current_user?.data?.[0]) {
          const userData = current_user.data[0];
          setAvatar(userData?.avatar?.url || "/path/to/default-avatar.png");
          setUser_name(userData?.user_name || "Unknown User");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    get_user_data();
  }, [post]);

  return (
    <div className="w-full max-w-xs bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Thumbnail */}
      <div className="relative h-48">
        <img
          src={Postimg}
          alt="Post Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video Information */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white truncate mb-2">
          {post?.title || "Untitled Post"}
        </h2>

        <div className="flex items-center mt-2">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="text-sm text-gray-400">
            <p>{user_name}</p>
            <p className="text-xs">{timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
