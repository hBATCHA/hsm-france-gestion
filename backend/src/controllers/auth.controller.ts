import { Request, Response } from "express"
import { login } from "../services/auth.service"

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "Email et mot de passe requis" })
    return
  }

  const result = await login(email, password)

  if (!result) {
    res.status(401).json({ message: "Identifiants invalides" })
    return
  }

  res.json(result)
}
