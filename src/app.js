import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ----------- routes --------------

// ----------- import routes ----------

import userRoutes from "./routes/user.routes.js";
import categoryRouter  from "./routes/category.routes.js";
// import healthcheckRouter from "./routes/healthcheck.routes.js"
import { ErrorHandler } from "./middleware/Error.middleware.js";

// ---------- routes declaration ------------

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRouter);
// app.get("/api/health", healthcheckRouter)

app.use(ErrorHandler);
export { app };
