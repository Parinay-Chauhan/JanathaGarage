import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../db/index.js";

const router = Router();

// Fast, lightweight health check for UptimeRobot / ping monitors
router.get("/", async (req, res) => {
  const checkDb = req.query.db === "true";
  let dbStatus = "skipped";

  if (checkDb) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = "connected";
    } catch (err) {
      dbStatus = "disconnected";
      return res.status(503).json(
        new ApiResponse(
          503,
          {
            status: "DEGRADED",
            service: "JantaGaraj API",
            database: dbStatus,
            uptime: Math.floor(process.uptime()),
            timestamp: new Date().toISOString(),
          },
          "Database connection failed"
        )
      );
    }
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        status: "OK",
        service: "JantaGaraj API",
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "production",
        ...(checkDb ? { database: dbStatus } : {}),
      },
      "API is healthy and active"
    )
  );
});

// Quick ping endpoint returning plain text
router.get("/ping", (req, res) => {
  return res.status(200).send("pong");
});

export default router;
