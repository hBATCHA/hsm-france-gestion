import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma"

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    await bcrypt.compare(password, "$2b$12$invalidhashtopreventtimingattack")
    return null
  }

  const valid = await bcrypt.compare(password, user.passwordHash)

  if (!valid) return null

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  )

  return { token, user: { id: user.id, email: user.email } }
}
