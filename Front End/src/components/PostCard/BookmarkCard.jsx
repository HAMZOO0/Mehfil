import React, { useState, useEffect } from "react";
import { get_user } from "../../api/auth.api.js";
import { useParams } from "react-router-dom";

export default function BookmarkCard({ post }) {
  // Format the createdAt date to "time ago"
  console.log("post --->", post);

  // const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
  //   addSuffix: true,
  // });

  const timeAgo = null;

  // Fallback image if post_img is not provided
  const Postimg = post?.post_img?.url ? post.post_img.url : null;

  // here i am handle user data
  const { userId } = useParams();
  const [avatar, setAvatar] = useState({});
  const [user_name, setUser_name] = useState("");

  useEffect(() => {
    const get_user_data = async () => {
      try {
        const current_user = await get_user(userId);

        const userData = current_user.data[0];
        console.log("followersCount", userData);

        setAvatar(userData?.avatar?.url || "/path/to/default-avatar.png"); // Add fallback avatar
        setUser_name(userData?.user_name || "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    get_user_data();
  }, []);

  return (
    <div className="w-screen max-w-3xl mx-auto bg-gray-700 rounded-lg p-4 text-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={""}
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
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4"></div>
      </div>
      {/* Comments Section */}
    </div>
  );
}
