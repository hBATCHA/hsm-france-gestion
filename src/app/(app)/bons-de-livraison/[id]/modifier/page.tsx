import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ModifierBonLivraisonForm from "./ModifierBonLivraisonForm"

export default async function ModifierBLPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [bl, customers, products, companies] = await Promise.all([
    prisma.deliveryNote.findUnique({
      where: { id },
      include: { lines: { include: { product: true } } },
    }),
    prisma.customer.findMany({ where: { archived: false }, orderBy: { companyName: "asc" } }),
    prisma.product.findMany({ where: { archived: false }, orderBy: { name: "asc" } }),
    prisma.companySettings.findMany({ select: { id: true, name: true } }),
  ])

  if (!bl) notFound()
  if (bl.invoiced) redirect(`/bons-de-livraison/${id}`)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#111827]">Modifier {bl.number}</h2>
      </div>
      <ModifierBonLivraisonForm
        bl={{
          id: bl.id,
          customerId: bl.customerId,
          date: bl.date.toISOString().split("T")[0],
          notes: bl.notes ?? "",
          globalDiscount: Number(bl.globalDiscount),
          companySettingsId: bl.companySettingsId,
          lines: bl.lines.map(l => ({
            productId: l.productId,
            quantity: l.quantity,
            unitPrice: Number(l.unitPrice),
            vatRate: Number(l.vatRate),
            discount: Number(l.discount),
          })),
        }}
        customers={customers.map(c => ({ id: c.id, companyName: c.companyName }))}
        products={products.map(p => ({ id: p.id, name: p.name, sellingPrice: Number(p.sellingPrice), vatRate: Number(p.vatRate), stock: p.stock }))}
        companies={companies}
      />
    </div>
  )
}
