import { useAuth } from "@/features/auth/AuthContext"

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-500 mb-6">
          Connecté en tant que <strong>{user?.email}</strong>
        </p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
