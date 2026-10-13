import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ModifierProduitForm from "./ModifierProduitForm"

export default async function ModifierProduitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const produit = await prisma.product.findUnique({ where: { id } })

  if (!produit) notFound()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Modifier le produit</h2>
          <p className="text-sm text-[#64748b] mt-1">{produit.name}</p>
        </div>
      </div>
      <ModifierProduitForm produit={produit} />
    </div>
  )
}
