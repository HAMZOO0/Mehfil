// src/pages/FollowPage.js
import React, { useEffect } from "react";
import {
  LoadingSpinner,
  FollowBox,
  Layout,
  Header,
  SideProfileView,
} from "../components/index.js";
import { useStore } from "../Store/store.js";
import { useNavigate } from "react-router-dom";

export default function FollowPage() {
  const { isAuthenticated } = useStore();
  const navigate = useNavigate();

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
      <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Increase size of FollowBox and add spacing */}
        <div className="w-full max-w-5xl mb-8">
          <FollowBox className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-900 rounded-lg shadow-lg" />
        </div>
      </div>
    </Layout>
  );
}
