import jwt from 'jsonwebtoken';
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
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      phone: user.phone,
      fullName: user.name,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
  );
};

// Refresh Token generator
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
  );
};