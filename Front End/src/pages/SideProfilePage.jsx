import {
  LoadingSpinner,
  Header,
  Layout,
  SideProfileView,
} from "../components/index.js";
import AllPost from "./AllPost";
import { useStore } from "../Store/store.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidepage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Return null or loading spinner while the navigation is happening
  if (!isAuthenticated) {
    return <LoadingSpinner />; // You can use any loading component here
  }

  return (
    <Layout header={<Header />}>
      <SideProfileView />
    </Layout>
  );
}
