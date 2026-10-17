import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();

router.route("/").get((req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { status: "OK", uptime: process.uptime() }, "API is healthy"));
});

export default router;