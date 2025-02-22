import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/Database.js";


dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3007, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("Connection error with Database", e);
  });