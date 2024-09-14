import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors"; // Correct import

const app = express();

// CORS middleware should be first
app.use(
  cors({
    origin: '*', // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(express.json({ limit: "16 kb" }));
app.use(express.urlencoded({ extended: true, limit: "16 kb" }));
app.use(express.static("public")); // Serve static files from 'public' folder
app.use(cookieparser()); // Parse cookies

// Import routers
import user_router from "./routers/user.route.js";
import post_router from "./routers/post.route.js";
import like_router from "./routers/like.route.js";
import follow_router from "./routers/follow.route.js";
import comment_router from "./routers/comment.route.js";
import bookmark_router from "./routers/bookmark.route.js";
import healthcheck_router from "./routers/healthcheck.router.js";

// Use routers
app.use("/api/v1/users", user_router);
app.use("/api/v1/posts", post_router);
app.use("/api/v1/likes", like_router);
app.use("/api/v1/follow", follow_router);
app.use("/api/v1/comment", comment_router);
app.use("/api/v1/bookmark", bookmark_router);
app.use("/api/v1/healthcheck", healthcheck_router);

export { app };
