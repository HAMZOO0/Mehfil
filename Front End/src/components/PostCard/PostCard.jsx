import React from "react";
import { formatDistanceToNow } from "date-fns"; // For displaying time ago
// PostCard component
export const PostCard = ({ post }) => {
  // Format the createdAt date to "time ago"
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });
  console.log("timeAgo", post.createdAt);

  return (
    <div className="pl-4 pt-1 bg-gray-800 rounded-md shadow-md">
      <div className="mb-2 flex items-center gap-x-2">
        {/* Avatar */}
        <img
          src={post.user.avatar.url}
          alt="author avatar"
          className="h-10 w-10 rounded-full border border-gray-600"
        />
        <div className="w-full">
          {/* Author's name */}
          <h2 className="font-bold text-white">{post.user.user_name}</h2>
          {/* Time since post was created */}
          <span className="ml-2 text-sm text-gray-400">{timeAgo}</span>
        </div>
        <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            ></path>
          </svg>
        </button>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
      <p className="mb-4 text-sm text-gray-300">{post.description}</p>
      {post_img && (
        <div className="mb-4">
          <img
            src={post.post_img.url}
            alt="post"
            className="w-full rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
