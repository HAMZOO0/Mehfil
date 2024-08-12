import dotenv from "dotenv";
import { app } from "./app.js";
import { dataBase_connection } from "./database/connection.js";
dotenv.config({ path: "./env" });

dataBase_connection()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `✔ Application is working on  http://localhost:${process.env.PORT} `
      );
    });
  })
  .catch((error) => {
    console.log("Database Connection Fail", error);
  });
