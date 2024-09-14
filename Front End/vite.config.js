import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxy :{
//   "/api" =  {
//     target: "http://localhost:5000",

// }}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
