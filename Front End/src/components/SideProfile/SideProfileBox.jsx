import React, { useState, useEffect } from "react";
import { useStore } from "../../Store/store.js";
import { get_user } from "../../api/auth.api.js";
import { useNavigate } from "react-router-dom";

const SideProfileView = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const id = user?._id || "";

  const [Email, setEmail] = useState("");
  const [avatar, setAvatar] = useState({});
  const [bio, setBio] = useState("No Bio");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [links, setLinks] = useState("");
  const [user_name, setUser_name] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;

      try {
        const current_user = await get_user(id);
        const userData = current_user.data[0];

        setEmail(userData?.Email || "");
        setAvatar(userData?.avatar?.url || "/path/to/default-avatar.png"); // Add fallback avatar
        setBio(userData?.bio || "No Bio ...");
        setFollowersCount(userData?.followersCount || 0);
        setFollowingCount(userData?.followingCount || 0);
        setLinks(userData?.links || "");
        setUser_name(userData?.user_name || "");

        console.log("current_user", userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [id]); // Dependency array changed to `id`

  return (
    <aside className="hidden md:block lg:col-span-3 bg-gray-900 sticky top-[100px] border p-4 min-w-48 text-white max-h-full">
      <img
        className="mb-3 flex aspect-square h-20 w-20 flex-shrink-0 rounded-full object-cover"
        src={avatar}
        alt="avatar"
      />
      <h2 className="text-3xl mg-1">{user_name}</h2>
      <p className="text-sm">
        <button className="hover:text-[#ae7aff] text-[#ae7aff] text-sm mg-2 py-3 ">
          {Email}
        </button>
      </p>
      <hr className="my-3 h-[1px] w-full" />
      <p className="mb-5 text-md">{bio}</p>

      <div className="mb-4 text-sm">
        <h3 className="mb-1 font-bold text-lg">Public link</h3>
        <button className="block text-[#ae7aff] hover:underline">
          {links}
        </button>
      </div>

      <p className="mb-4 flex gap-x-4 text-lg">
        <span className="inline-block">
          <span className="font-bold">{followersCount}</span>
          <span className="text-gray-400 pl-1"> Followers</span>
        </span>
        <span className="inline-block">
          <span className="font-bold">{followingCount}</span>
          <span className="text-gray-400 pl-1"> Following</span>
        </span>
      </p>

      <button
        onClick={() => {
          if (id) {
            navigate(`/profile/${id}`);
          }
        }}
        className="inline-flex w-max items-center bg-[#ae7aff] px-7 py-3 text-center font-bold text-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
      >
        View Profile
      </button>
    </aside>
  );
};

export default SideProfileView;
