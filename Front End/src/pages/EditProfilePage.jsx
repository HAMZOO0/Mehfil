import React from "react";
import { EditProfile } from "../components/index.js";

import {
  LoadingSpinner,
  Header,
  Layout,
  SideProfileView,
  UserProfileHeader,
} from "../components/index.js";
import AllPost from "./UserAllPosts.jsx";
import { useStore } from "../Store/store.js";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <Layout header={<Header />} sidebar={<SideProfileView />}>
      <UserProfileHeader />
      <EditProfile />
    </Layout>
  );
}
