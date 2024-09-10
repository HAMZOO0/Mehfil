import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json({ limit: "16 kb" }));
app.use(express.urlencoded({ extended: true, limit: "16 kb" }));
app.use(express.static("public")); // 'Public' folder se files server ko send krnaa
app.use(cookieparser()); // here we send and resive cookies from clien and save in server and perform other opration on cookies
app.use(cookieparser()); // here we send and resive cookies from clien and save in server and perform other opration on cookies
app.use(
  cors({
    origin: 'https://mehfil-woad.vercel.app', // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

import user_router from "./routers/user.route.js";
import post_router from "./routers/post.route.js";
import like_router from "./routers/like.route.js";
import follow_router from "./routers/follow.route.js";
import comment_router from "./routers/comment.route.js";
import bookmark_router from "./routers/bookmark.route.js";
import healthcheck_router from "./routers/healthcheck.router.js";

app.use("/api/v1/users", user_router);
app.use("/api/v1/posts", post_router);
app.use("/api/v1/likes", like_router);
app.use("/api/v1/follow", follow_router);
app.use("/api/v1/comment", comment_router);
app.use("/api/v1/bookmark", bookmark_router);
app.use("/api/v1/healthcheck", healthcheck_router);

export { app };
