import {
  LoadingSpinner,
  Header,
  Layout,
  SideProfileView,
  CreatePost,
} from "../components/index.js";
import AllPost from "./AllPost";
import { useStore } from "../Store/store.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();

  useEffect(() => {
    console.log("ma lonin hon ");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Return null or loading spinner while the navigation is happening
  if (!isAuthenticated) {
    return <LoadingSpinner />; // You can use any loading component here
  }

  return (
    <Layout header={<Header />} sidebar={<SideProfileView />}>
      <CreatePost />
      <AllPost />
    </Layout>
  );
}
