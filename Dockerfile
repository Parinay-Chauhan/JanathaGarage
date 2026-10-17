# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Install dependencies first (leveraging Docker layer caching)
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies for prisma CLI)
RUN npm install

# Copy rest of the application source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port where application runs
EXPOSE 8000

# Start the application
CMD ["npm", "run", "start"]