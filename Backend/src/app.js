import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(express.json({ limit: "16 kb" }));
app.use(express.urlencoded({ extended: true, limit: "16 kb" }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://mehfil-social-media.vercel.app', // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Define your routes here
import user_router from "./routers/user.route.js";
// Other route imports

app.use("/api/v1/users", user_router);
// Other routes

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export { app };
