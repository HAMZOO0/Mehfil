import { useEffect, useState } from "react";
import { all_users } from "../../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // For displaying time ago
import { Link } from "react-router-dom";
async function getUserFunction(setUsers) {
  try {
    const response = await all_users();
    const users = response.data;
    setUsers(users); // Update state with fetched users
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function time(params) {
  const timeAgo = formatDistanceToNow(new Date(params), {
    addSuffix: true,
  });
  return timeAgo;
}

function FollowBox() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // Initialize state to hold user data

  useEffect(() => {
    getUserFunction(setUsers); // Fetch and set users when component mounts
  }, []);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-4 bg-slate-800 py-10">
        <h1 className="my-4 text-xl font-medium text-white sm:text-2xl">
          Follow Members
        </h1>

        <div className="user-list w-full max-w-xs mx-auto bg-slate-700 rounded-lg shadow-lg flex flex-col py-2 sm:max-w-sm text-white h-96 overflow-y-scroll">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="user-row flex flex-col items-center justify-between cursor-pointer p-3 duration-300 sm:flex-row sm:py-3 sm:px-6 hover:bg-[#5e5a90] text-white"
              >
                <Link to={`/profile/${user._id}`}>
                  <div className="user flex items-center text-center flex-col sm:flex-row sm:text-left text-white">
                    <div className="avatar-content mb-2 sm:mb-0 sm:mr-2 text-white ">
                      <img
                        className="avatar w-12 h-12 sm:w-14 sm:h-14 rounded-full text-white"
                        src={user.avatar.url}
                        alt={user.user_name}
                      />
                    </div>
                    <div className="user-body flex flex-col mb-3 sm:mb-0 sm:mr-3">
                      <a
                        href="#"
                        className="title font-medium no-underline text-white text-lg"
                      >
                        {user.user_name}
                      </a>
                      <div className="skills flex flex-col">
                        <span className="subtitle text-md text-purple-500">
                          {user.Email}
                        </span>
                        <span className="subtitle text-slate-400 text-sm">
                          {time(user.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="user-option mx-auto sm:ml-auto sm:mr-0"
                >
                  <button className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-2 py-2 rounded-lg text-sm font-medium leading-5 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300 ">
                    View Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4">No users found.</div>
          )}
          <a
            className="show-more block w-10/12 mx-auto py-2 px-3 text-center no-underline rounded hover:bg-[#f6f8f9] font-medium duration-300 text-black text-sm"
            href="#/"
          ></a>
        </div>
      </div>
    </>
  );
}

export default FollowBox;
