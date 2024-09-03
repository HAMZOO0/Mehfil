import React from "react";

const SideProfileView = () => {
  return (
    <div class="mt-[65px] grid grid-cols-12 gap-4 pb-8 pt-0 sm:px-4 sm:pt-8 md:mt-[83px] lg:px-10">
      <aside class="hidden text-white md:col-span-4 md:block lg:col-span-3  bg-gray-900">
        <div class="sticky top-[100px] border p-4">
          <img
            class="mb-3 flex aspect-square h-16 w-16 flex-shrink-0 rounded-full object-cover"
            src="https://images.pexels.com/photos/7775642/pexels-photo-7775642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="avatar"
          />
          <h2>Aurora Starlight</h2>
          <p class="text-sm">
            <button class="hover:text-[#ae7aff]">starryaurora@gmail.com</button>
          </p>
          <hr class="my-2 h-[1px] w-full" />
          <p class="mb-4">Night owl | Moon enthusiast | Wanderlust 🌕🌙🌎</p>
          <button class="inline-flex w-max items-center bg-[#ae7aff] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
            View Profile
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SideProfileView;
