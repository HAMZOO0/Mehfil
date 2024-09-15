import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArticleIcon from "@mui/icons-material/Article"; // Post Icon
import EditIcon from "@mui/icons-material/Edit"; // Edit Icon
import BookmarkIcon from "@mui/icons-material/Bookmark"; // Bookmark Icon
import PersonPinIcon from "@mui/icons-material/PersonPin";
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
      navigate(`/Sidepage`);
    }
    if (newValue === 2) {
      navigate(`/profile/edit-profile`);
    }
    if (newValue === 3) {
      navigate(`/bookmark`);
    }
  };

  // Ensure only current user's profile shows this navigation header
  const { user } = useStore();
  if (user?._id !== ID) return null;

  return (
    <>
      <div className="w-full py-5">
        {/* Responsive container for different screen sizes */}
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-20">
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => handleNavigation(newValue)}
            className="bg-gray-700 rounded-lg shadow-lg"
            sx={{ backgroundColor: "#374151" }} // Keeping MUI background color logic
          >
            <BottomNavigationAction
              label="Posts"
              icon={<ArticleIcon sx={{ color: "white" }} />}
              sx={{ color: "white" }} // Text color to white
            />
            <BottomNavigationAction
              label="User"
              icon={<PersonPinIcon sx={{ color: "white" }} />}
              sx={{ color: "white" }} // Text color to white
            />

            <BottomNavigationAction
              label="Bookmark"
              icon={<BookmarkIcon sx={{ color: "white" }} />}
              sx={{ color: "white" }} // Text color to white
            />
            <BottomNavigationAction
              label="Edit"
              icon={<EditIcon sx={{ color: "white" }} />}
              sx={{ color: "white" }} // Text color to white
            />
          </BottomNavigation>
        </div>
      </div>
    </>
  );
}
