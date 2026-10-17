import "dotenv/config";
import { connectDB, prisma } from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;


// Database connect hone ke baad server start karenge.
connectDB()
  .then(async () => {
    try {
      await prisma.user.updateMany({
        where: { phone: "9876500002" },
        data: { fullName: "Suresh Verma" },
      });
      console.log("Updated technician name to Suresh Verma successfully in DB");
    } catch (e) {
      console.log("DB update notice:", e.message);
    }
    app.listen(PORT, () => {
      console.log(
        `⚙️ Server is running at port :  ${process.env.PORT || 8000}`
      );
    });
  })
  .catch((error) => {
    console.log(`PostgreSQL connection fail !!!`, error);
  });
