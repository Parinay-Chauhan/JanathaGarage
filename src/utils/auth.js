import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt';

//  ---------- Clerk use ker rehe hai ---------------

// Hash password function (Save karne se pehle call karein)
// export const hashPassword = async (password) => {
//   return await bcrypt.hash(password, 10);
// };

// // Compare password
// export const isPasswordCorrect = async (enteredPassword, hashedPassword) => {
//   return await bcrypt.compare(enteredPassword, hashedPassword);
// };

// Access Token generator

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "1d",
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || "7d",
  });
};
