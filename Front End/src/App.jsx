import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AllPost from "./pages/AllPost.jsx";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePostPage.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allPosts" element={<AllPost />} />
        <Route path="/CreatePost" element={<CreatePost />} />

        {/* <Route path="/profile/:username" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
