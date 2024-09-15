import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AllPost from "./pages/AllPost.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePostPage.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";
import BookmarkLayout from "./pages/BookmarkLayout.jsx";
import FollowPage from "./pages/Follow.jsx";
import Sidepage from "./pages/SideProfilePage.jsx";
import About_page from "./pages/About.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:postId" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allPosts" element={<AllPost />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/profile/edit-profile" element={<EditProfilePage />} />
        <Route path="/bookmark" element={<BookmarkLayout />} />
        <Route path="/follow" element={<FollowPage />} />
        <Route path="/Sidepage" element={<Sidepage />} />
        <Route path="/about" element={<About_page />} />
      </Routes>
    </Router>
  );
}

export default App;
