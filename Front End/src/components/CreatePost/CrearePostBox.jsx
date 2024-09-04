  import React from "react"
export default function CrearePostBox() {
  return (
    <>
      <div className="w-full max-w-3xl mx-auto bg-gray-700 rounded-lg p-4 text-white shadow-lg">
        <img
          class="flex aspect-square h-10 w-10 shrink-0 rounded-full object-cover"
          // todo avatar
          src=""
          alt="avatar"
        />
        <input
          placeholder="Type to add something"
          class="w-full bg-transparent p-2 text-white !outline-none placeholder:text-gray-500 md:p-4"
        />

        <div class="flex gap-x-1 sm:gap-x-2">
         
          <button class="flex shrink-0 items-center justify-center p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="w-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              ></path>
            </svg>
          </button>
          <button class="flex shrink-0 items-center justify-center bg-[#ae7aff] p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="w-6 text-black"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
