import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js"

dotenv.config({
    path: './.env'
})


// Database connect hone ke baad server start karenge.
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port :  ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log(`PostgreSQL connection fail !!!`, error);
  });
