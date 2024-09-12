import dotenv from "dotenv";
import { app } from "./app.js";
import { dataBase_connection } from "./database/connection.js";

// Load environment variables from Vercel
dotenv.config();

dataBase_connection()
  .then(() => {
    // Listen on the port provided by Vercel or default to 3000 for local development
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`✔ Application is working on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database Connection Failed", error);
    process.exit(1); // Exit the process with failure code
  });
