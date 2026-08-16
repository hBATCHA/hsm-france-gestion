import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AppSidebar from "@/components/layout/AppSidebar"
import AppHeader from "@/components/layout/AppHeader"

const pageTitles: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/clients": "Clients",
  "/produits": "Produits",
  "/stock": "Stock",
  "/bons-de-livraison": "Bons de livraison",
  "/factures": "Factures",
  "/paiements": "Paiements",
  "/exports": "Exports",
  "/parametres": "Paramètres",
}

interface AppLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug?: string[] }>
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AppSidebar />
      <div className="flex flex-col flex-1 ml-[280px] min-w-0">
        <AppHeader title="H.S.M.FRANCE" />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
