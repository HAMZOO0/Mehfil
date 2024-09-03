import React from "react";

const SideProfileFullBox = () => {
  return (
    <div class="mt-[65px] grid grid-cols-12 gap-4 pb-8 pt-0 sm:px-4 sm:pt-8 md:mt-[83px] lg:px-10 ">
      <aside class="col-span-12 text-white md:col-span-5 lg:col-span-4 xl:col-span-3 bg-gray-900">
        <div class="sticky top-[100px] border-b border-white p-4 sm:border">
          <img
            class="mb-3 flex aspect-square h-16 w-16 rounded-full border-2 border-[#ae7aff] object-cover"
            src="https://images.pexels.com/photos/569314/pexels-photo-569314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="avatar"
          />
          <h2 class="mb-1 font-bold">Zen Garden</h2>
          <p class="text-sm">
            Meditation guru | Nature lover | Zen master 🧘‍♂️🌿🍃
          </p>
          <hr class="my-4 h-[1px] w-full" />
          <div class="mb-4">
            <h3 class="mb-1 font-bold">Short Bio</h3>
            <p class="text-sm">
              Guiding inner peace through meditation, finding solace in
              nature&#x27;s embrace, and mastering the art of Zen living. 🧘‍♂️🌿🍃
            </p>
          </div>
          <div class="mb-4 text-sm">
            <h3 class="mb-1 font-bold">Public link</h3>
            <button class="block text-[#ae7aff] hover:underline">
              gardenzen@gmail.com
            </button>
            <button class="block break-all text-[#ae7aff] hover:underline">
              http://www.zengardenmindfulness.com/
            </button>
          </div>
          <p class="mb-4 flex gap-x-4">
            <span class="inline-block">
              <span class="font-bold">400 </span>
              <span class="text-sm text-gray-400">Followers</span>
            </span>
            <span class="inline-block">
              <span class="font-bold">70 </span>
              <span class="text-sm text-gray-400">Following</span>
            </span>
          </p>
          <button class="inline-flex w-max items-center bg-[#ae7aff] px-4 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out after:content-[&#x27;Follow&#x27;] focus:after:content-[&#x27;Unfollow&#x27;] active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
            Follow
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SideProfileFullBox;
