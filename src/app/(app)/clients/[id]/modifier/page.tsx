import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ModifierClientForm from "./ModifierClientForm"

export default async function ModifierClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await prisma.customer.findUnique({ where: { id } })

  if (!client) notFound()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Modifier le client</h2>
          <p className="text-sm text-[#64748b] mt-1">{client.companyName}</p>
        </div>
      </div>
      <ModifierClientForm client={client} />
    </div>
  )
}
