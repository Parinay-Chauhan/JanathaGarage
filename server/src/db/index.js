import { PrismaClient } from '@prisma/client';

// PrismaClient ka instance create kar rahe hain
const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        // Supabase/PostgreSQL ke sath connection test kar rahe hain
        await prisma.$connect();
        console.log("PostgreSQL connected successfully with Supabase!");
    } catch (error) {
        console.log("PostgreSQL connection error:", error);
        process.exit(1);
    }
};

export { prisma, connectDB };