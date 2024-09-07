import {
  LoadingSpinner,
  Header,
  Layout,
  SideProfileView,
  UserProfileHeader,
} from "../components/index.js";
import AllPost from "./UserAllPosts.jsx";
import { useStore } from "../Store/store.js";
import { set_user_profile_id } from "../Store/store.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  const { setID } = set_user_profile_id();

  if (!isAuthenticated) {
    navigate("/login");
  }

  const { userId } = useParams();

  // here i get id from url and set and i will use this in all post user profile header
  useEffect(() => {
    // Set the userId in the Zustand store when the component mounts
    if (userId) {
      setID(userId);
    }
  }, [userId, setID]);

  return (
    <Layout header={<Header />} sidebar={<SideProfileView />}>
      <UserProfileHeader />
      <AllPost />
    </Layout>
  );
}
