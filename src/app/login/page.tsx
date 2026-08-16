"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Identifiants invalides")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-white to-green-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-9 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">Connexion</h3>
        <p className="text-sm text-gray-500 mb-7">Accédez à votre espace de gestion</p>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-800">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="exemple@hsm-france.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-12 px-4 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-gray-800">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="h-12 px-4 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-11 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  )
}
