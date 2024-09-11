import React, { useState, useEffect } from "react";
import { useStore } from "../../Store/store.js";
import { get_user } from "../../api/auth.api.js";
import { useNavigate, useParams } from "react-router-dom";
import { toggleFollow } from "../../api/follow.api.js";
import { Toaster } from "react-hot-toast";

const SideProfileView = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  let id = user?.data?._id || "";

  const { userId } = useParams();
  if (userId) {
    id = userId;
  }
  console.log("userId -->", userId);
  console.log("id -->", id);
  console.log("id -->", id);

  const [user_profile_check, setuser_profile_check] = useState(false);
  const [IsFollow, setIsFollow] = useState(false);
  const [Email, setEmail] = useState("");
  const [avatar, setAvatar] = useState({});
  const [bio, setBio] = useState("No Bio");
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [links, setLinks] = useState("");
  const [user_name, setUser_name] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const current_user = await get_user(id);
        const userData = current_user.data[0];

        setEmail(userData?.Email || "");
        setAvatar(userData?.avatar?.url || "/path/to/default-avatar.png");
        setBio(userData?.bio || "No Bio ...");
        setFollowersCount(userData?.followersCount || 0);
        setFollowingCount(userData?.followingCount || 0);
        setLinks(userData?.links || "");
        setUser_name(userData?.user_name || "");
        setIsFollow(userData?.isFollow);

        if (id === user?.data?._id || userId === undefined) {
          setuser_profile_check(false);
        } else {
          setuser_profile_check(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // handle follow button
  const handleFollow = async () => {
    try {
      // if user_profile_check is false then i nagivate to profile section and use conditions to check for own profile and other users to set follow / view profile button
      if (!user_profile_check) {
        navigate(`/profile/${id}`);
      } else {
        const response = await toggleFollow(id);

        // Toggle the follow status and adjust followers count accordingly
        setIsFollow((prev) => !prev);
        setFollowersCount((prevCount) =>
          IsFollow ? prevCount - 1 : prevCount + 1
        );
      }
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    }
  };

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
        <button className="block text-[#ae7aff] hover:underline text-start">
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
        onClick={handleFollow}
        className="inline-flex w-max items-center bg-[#ae7aff] px-7 py-3 text-center font-bold text-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
      >
        {user_profile_check
          ? IsFollow
            ? "Unfollow"
            : "Follow"
          : "View Profile"}
      </button>

      <Toaster position="bottom-left" reverseOrder={false} />
    </aside>
  );
};

export default SideProfileView;
