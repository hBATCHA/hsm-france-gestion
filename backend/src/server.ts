import "dotenv/config"
import express from "express"
import cors from "cors"
import authRouter from "./routes/auth"

if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET manquant dans .env")
  process.exit(1)
}

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.use("/api/auth", authRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`)
})
