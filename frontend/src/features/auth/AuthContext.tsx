import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface AuthUser {
  id: string
  email: string
}

interface AuthContextValue {
  token: string | null
  user: AuthUser | null
  login: (token: string, user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("hsm_token")
  )
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem("hsm_user")
    return raw ? JSON.parse(raw) : null
  })

  function login(newToken: string, newUser: AuthUser) {
    localStorage.setItem("hsm_token", newToken)
    localStorage.setItem("hsm_user", JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  function logout() {
    localStorage.removeItem("hsm_token")
    localStorage.removeItem("hsm_user")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
