import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
    })

export { prisma }
