import React from "react";
import { useStore } from "../../Store/store.js";

const SideProfileView = () => {
  const { user } = useStore();
  const user_name = user?.user_name || "";
  const Email = user?.Email || "";
  const avatar = user?.avatar || {};
  const bio = user?.bio || "No Bio ... ";

  console.log("user", user);

  return (
    <aside className="hidden md:block lg:col-span-3 bg-gray-900 sticky top-[100px] border p-4 min-w-48 text-white max-h-full">
      <img
        className="mb-3 flex aspect-square h-20 w-20 flex-shrink-0 rounded-full object-cover"
        src={avatar?.url}
        alt="avatar"
      />
      <h2 className="text-3xl mg-1">{user_name}</h2>
      <p className="text-sm">
        <button className="hover:text-[#ae7aff] text-[#ae7aff] text-sm mg-2 py-3 ">
          {Email}
        </button>
      </p>
      <hr className="my-3 h-[1px] w-full" />
      <p className="mb-5 text-md ">{bio}</p>
      <button className="inline-flex w-max items-center bg-[#ae7aff] px-7 py-3 text-center font-bold text-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
        View Profile
      </button>
    </aside>
  );
};

export default SideProfileView;
