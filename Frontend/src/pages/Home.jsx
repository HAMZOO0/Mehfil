import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await getCurrentUser();
        setUser(data.data);
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.user_name}</h1>
      {/* Add post feed or other components */}
    </div>
  );
};

export default Home;
