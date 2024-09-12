import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArticleIcon from "@mui/icons-material/Article"; // Post Icon
import EditIcon from "@mui/icons-material/Edit"; // Edit Icon
import BookmarkIcon from "@mui/icons-material/Bookmark"; // Bookmark Icon

import { useStore } from "../../Store/store.js";

// here we import the setid to use this in header to show the header
import { set_user_profile_id } from "../../Store/store.js";

export default function UserProfileHeader() {
  const navigate = useNavigate(); // For navigation
  const [value, setValue] = useState(0);
  const { ID } = set_user_profile_id();

  const handleNavigation = (newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate(`/profile/${ID}`);
    }
    if (newValue === 1) {
      navigate(`/profile/edit-profile`);
    }
    if (newValue === 2) {
      navigate(`/bookmark`);
    }
  };

  // now we make a logic for , if the user is open someone else profile the  then we can't show this header we shoud show the posts
  const { user } = useStore();
  if (user?._id !== ID) return null;

  return (
    <>
      <div className="py-10 w-full">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => handleNavigation(newValue)}
          sx={{ backgroundColor: "#374151" }} // This sets bg-gray-700 (hex #374151)
        >
          <BottomNavigationAction
            label="Posts"
            icon={<ArticleIcon sx={{ color: "white" }} />}
            sx={{ color: "white" }} // This sets the text color to white
          />
          <BottomNavigationAction
            label="Edit"
            icon={<EditIcon sx={{ color: "white" }} />}
            sx={{ color: "white" }} // This sets the text color to white
          />
          <BottomNavigationAction
            label="Bookmark"
            icon={<BookmarkIcon sx={{ color: "white" }} />}
            sx={{ color: "white" }} // This sets the text color to white
          />
        </BottomNavigation>
      </div>
    </>
  );
}
