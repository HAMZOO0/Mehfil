import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json({ limit: "16 kb" }));
app.use(express.urlencoded({ extended: true, limit: "16 kb" }));
app.use(express.static("public")); // 'Public' folder se files serve ko send krnaa
app.use(cookieparser()); // here we send and resive cookies from clien and save in server and perform other opration on cookies
app.use(cors({ origin: process.env.CORS }));

import user_router from "./routers/user.route.js";

app.use("/api/v1/users", user_router);

export { app };
