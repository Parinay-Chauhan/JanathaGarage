import express from "express";
import cors from "cors";

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

// Health check route
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Server is running smoothly!" });
});

export { app };
