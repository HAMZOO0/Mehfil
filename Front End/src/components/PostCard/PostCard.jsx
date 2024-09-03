import React from "react";
import { formatDistanceToNow } from "date-fns"; // For displaying time ago
// PostCard component
export const PostCard = ({ post }) => {
  // Format the createdAt date to "time ago"
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });
  // console.log(post.user[0].avatar.url);

  // ! avatart is missing make change in db and also set data in varables and  like if someone not add a post img then we handle it
  return (
    <>
      <div className="min-h-screen bg-[#121212]">
        <div className="mt-[65px] grid grid-cols-12 gap-4 pb-8 pt-0 sm:px-4 sm:pt-8 md:mt-[83px] lg:px-10">
          <section className="col-span-12 border-b border-t border-white sm:border-l sm:border-r md:col-span-8 lg:col-span-6">
            <div className="flex border-b border-white p-4 text-white last:border-none">
              <div className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                {post.user[0].avatar && (
                  <img
                    // todo user avatar
                    src={post.user[0].avatar.url}
                    alt="Solar Flare "
                    className="h-full w-full rounded-full object-cover"
                  />
                )}
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">
                      {/* // todo post author */}
                      {post.user[0].user_name}
                    </h2>
                    <span className="ml-2 inline-block text-sm text-gray-400">
                      {/* // todo post time */}
                      {timeAgo}
                    </span>
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
                <p className="mb-2 text-lg font-semibold sm:text-xl text-white">
                  {/* Post Title */}
                  {post.title}
                </p>

                <p className="text-gray-300 text-sm sm:text-base pb-7">
                  {/* Post Description */}
                  {post.description}
                </p>

                <div className="mb-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                  {/* //  todo Post img  */}
                  {post.post_img && (
                    <img src={post.post_img.url} alt={post.title} />
                  )}
                </div>
                <div className="flex gap-x-4">
                  <button
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] text-[#ae7aff] focus:text-inherit"
                    data-like-count="802"
                    data-like-count-alt="801"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 fill-[#ae7aff] group-focus:fill-none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      ></path>
                    </svg>
                  </button>

                  {/* // todo comment button  */}
                  <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>99</span>
                  </button>
                  <div className="ml-auto">
                    <button className="mr-2 inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <button className="group inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff] focus:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 fill-[#ae7aff] text-[#ae7aff] group-focus:fill-none group-focus:text-inherit"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PostCard;
