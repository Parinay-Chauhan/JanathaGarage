import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Prisma query database se user dhoondhne ke liye
    const user = await prisma.user.findUnique({
      where: { id: decodedToken?.id },
      select: {
        id: true,
        name: true,
        phone: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const authorizeRoles = (...allowedRoles) => {
  return (req, _, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Access denied. Role '${req.user.role}' is not allowed to access this resource.`,
      );
    }

    next();
  };
};