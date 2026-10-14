import { ApiError } from "../utils/ApiError.js";

const ErrorHandler = (err, req, res, next) => {
  let error = err;

  // Agar error humari ApiError class ka nahi hai, toh usko standard ApiError mein convert karo
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, [], err.stack);
  }

  const response = {
    success: error.success,
    message: error.message,
    errors: error.errors,
    // Development mode mein stack trace bhi bhejenge debugging ke liye
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export { ErrorHandler };