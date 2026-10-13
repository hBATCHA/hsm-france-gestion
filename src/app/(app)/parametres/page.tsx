import { prisma } from "@/lib/prisma"
import ParametresForm from "./ParametresForm"

export default async function ParametresPage() {
  const settings = await prisma.companySettings.findUnique({ where: { id: "default" } })

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#111827]">Paramètres</h2>
        <p className="text-sm text-[#64748b] mt-1">Informations de votre entreprise utilisées sur les factures</p>
      </div>
      <ParametresForm settings={settings} />
    </div>
  )
}
