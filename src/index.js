import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import { connectDB } from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

// Database connect hone ke baad server start karenge.
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `⚙️ Server is running at port :  ${process.env.PORT || 8000}`
      );
    });
  })
  .catch((error) => {
    console.log(`PostgreSQL connection fail !!!`, error);
  });
