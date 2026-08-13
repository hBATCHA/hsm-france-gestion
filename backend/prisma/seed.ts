import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcrypt"


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL});
const prisma = new PrismaClient({ adapter })


async function main() {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);
    
    await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL! },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL!,
            passwordHash
        }
    })
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())