import React from "react";
import { formatDistanceToNow } from "date-fns"; // For displaying time ago
import { useState } from "react";


export const PostCard = ({ post }) => {
  // Format the createdAt date to "time ago"
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  // Fallback image if post_img is not provided
  const Postimg = post?.post_img?.url ? post.post_img.url : null;

   // State to manage comment visibility
  const [showComments, setShowComments] = useState(false);
  // Toggle comment visibility
 const toggleComments = () => {
    setShowComments(!showComments);
// ! comment api manage here 
  };
  

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-700 rounded-lg p-4 text-white shadow-lg">
      {/* Post Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={post.user[0].avatar.url}
            alt="User Profile"
            className="w-14 h-14 rounded-full mr-4"
          />
          <div>
            <span className="block text-xl font-bold">
              {post.user[0].username}
            </span>
            <span className="block text-md text-gray-400">{timeAgo}</span>
          </div>
        </div>
        <div className="text-2xl">...</div>
      </div>

      {/* Post Content */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-lg text-gray-300 mb-4">{post.description}</p>
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

      {/* Post Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 text-[#ae7aff]">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Like</span>
          </button>
          <button
            className="flex items-center space-x-2 text-[#ae7aff]"
            onClick={toggleComments}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
              />
            </svg>
            <span>Comment</span>
          </button>
        <button className="flex items-center space-x-2 text-[#ae7aff]">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
              clipRule="evenodd"
            />
          </svg>
          <span>Share</span>
        </button>
      </div>
     {/* Comments Section */}
      {showComments && (
        <div className="mt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center mb-2">
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <span className="font-bold">{comment.user}:</span>{" "}
                <span className="text-gray-300">{comment.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
