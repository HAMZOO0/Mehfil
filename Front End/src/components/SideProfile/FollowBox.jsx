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
    <div className="flex flex-col items-center min-h-screen p-4 bg-slate-800 py-10">
      <h1 className="my-4 text-xl font-medium text-white sm:text-2xl md:text-3xl">
        Follow Members
      </h1>

      <div className="user-list w-full max-w-md mx-auto bg-slate-700 rounded-lg shadow-lg flex flex-col py-2 sm:max-w-lg lg:max-w-2xl h-96 overflow-y-auto">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="user-row flex flex-col sm:flex-row items-center justify-between cursor-pointer p-3 duration-300 hover:bg-[#5e5a90] text-white"
            >
              <Link
                to={`/profile/${user._id}`}
                className="flex items-center w-full"
              >
                <div className="avatar-container flex-shrink-0 mr-3">
                  <img
                    className="avatar w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    src={user.avatar.url}
                    alt={user.user_name}
                  />
                </div>
                <div className="user-body flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                  <div className="text-content mb-3 sm:mb-0">
                    <span className="title font-medium text-white text-lg block">
                      {user.user_name}
                    </span>
                    <div className="skills flex flex-col">
                      <span className="subtitle text-md text-purple-500">
                        {user.Email}
                      </span>
                      <span className="subtitle text-slate-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                        {/* Adjust the date format as needed */}
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="user-option mt-2 sm:mt-0 flex-shrink-0"
                  >
                    <button className="btn px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#6911e7] hover:bg-[#590acb] duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No users found.</div>
        )}
        <a
          className="show-more block w-10/12 mx-auto py-2 px-3 text-center rounded hover:bg-[#f6f8f9] font-medium duration-300 text-white text-sm"
          href="#/"
        >
          Show More
        </a>
      </div>
    </div>
  );
}

export default FollowBox;
