import { prisma } from "@/lib/prisma"
import DeliveryNoteForm from "./DeliveryNoteForm"

export default async function NouveauBonLivraisonPage() {
  const [customers, products] = await Promise.all([
    prisma.customer.findMany({ where: { archived: false }, orderBy: { companyName: "asc" } }),
    prisma.product.findMany({ where: { archived: false }, orderBy: { name: "asc" } }),
  ])

  const customersForForm = customers.map(c => ({ id: c.id, companyName: c.companyName }))
  const productsForForm = products.map(p => ({
    id: p.id,
    name: p.name,
    sellingPrice: Number(p.sellingPrice),
    vatRate: Number(p.vatRate),
    stock: p.stock,
  }))

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#111827]">Nouveau bon de livraison</h2>
        <p className="text-sm text-[#64748b] mt-1">Renseignez le client et les produits livrés</p>
      </div>
      <DeliveryNoteForm customers={customersForForm} products={productsForForm} />
    </div>
  )
}
