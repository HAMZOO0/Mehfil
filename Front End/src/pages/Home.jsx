import {
  LoadingSpinner,
  Header,
  Layout,
  SideProfileView,
} from "../components/index.js";
import AllPost from "./AllPost";
import { useStore } from "../Store/store.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <Layout header={<Header />} sidebar={<SideProfileView />}>
      <AllPost />
    </Layout>
  );
}
