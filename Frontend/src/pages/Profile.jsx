import { useState, useEffect } from "react";
import { getUserProfile } from "../services/api";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getUserProfile(username);
        setUserData(data.data);
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.user_name}</h1>
      <p>{userData.bio}</p>
      <p>Followers: {userData.followersCount}</p>
      <p>Following: {userData.followingCount}</p>
      {/* Add other profile data like avatar */}
    </div>
  );
};

export default Profile;
