import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { archiveProduct } from "@/app/actions/products"
import { Pencil, Archive } from "lucide-react"

export default async function ProduitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const produit = await prisma.product.findUnique({ where: { id } })

  if (!produit) notFound()

  const isLowStock = produit.alertThreshold > 0 && produit.stock <= produit.alertThreshold
  const isOutOfStock = produit.stock === 0

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[#111827]">{produit.name}</h2>
            {isOutOfStock ? (
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fef2f2] text-[#dc2626]">Rupture</span>
            ) : isLowStock ? (
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fff7ed] text-[#d97706]">Stock faible</span>
            ) : (
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">OK</span>
            )}
          </div>
          {produit.reference && <p className="text-sm text-[#64748b]">Réf. {produit.reference}</p>}
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/produits/${id}/modifier`} className="flex items-center gap-2 h-10 px-4 border border-[#166534] text-[#166534] text-sm font-semibold rounded-[10px] hover:bg-[#f0fdf4] transition-colors">
            <Pencil size={16} />
            Modifier
          </Link>
          {!produit.archived && (
            <form action={async () => { "use server"; await archiveProduct(id) }}>
              <button type="submit" className="flex items-center gap-2 h-10 px-4 border border-[#e2e8f0] text-[#64748b] text-sm font-semibold rounded-[10px] hover:bg-[#fef2f2] hover:text-[#dc2626] hover:border-[#fecaca] transition-colors">
                <Archive size={16} />
                Archiver
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-5">Informations produit</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Catégorie", value: produit.category },
                { label: "Marque", value: produit.brand },
                { label: "Variété", value: produit.variety },
                { label: "Conditionnement", value: produit.packaging },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-[#64748b]">{label}</p>
                  <p className="text-sm font-medium text-[#111827] mt-0.5">{value ?? "—"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-5">Tarification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#64748b]">Prix d'achat HT</p>
                <p className="text-sm font-medium text-[#111827] mt-0.5">
                  {Number(produit.purchasePrice).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#64748b]">Prix de vente HT</p>
                <p className="text-sm font-bold text-[#166534] mt-0.5">
                  {Number(produit.sellingPrice).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#64748b]">TVA</p>
                <p className="text-sm font-medium text-[#111827] mt-0.5">{Number(produit.vatRate)} %</p>
              </div>
              <div>
                <p className="text-xs text-[#64748b]">Prix TTC</p>
                <p className="text-sm font-medium text-[#111827] mt-0.5">
                  {(Number(produit.sellingPrice) * (1 + Number(produit.vatRate) / 100)).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-[14px] p-6">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Stock actuel</h3>
            <p className={`text-4xl font-bold ${isOutOfStock ? "text-[#dc2626]" : isLowStock ? "text-[#d97706]" : "text-[#166534]"}`}>
              {produit.stock}
            </p>
            <p className="text-xs text-[#64748b] mt-1">unités</p>
            {produit.alertThreshold > 0 && (
              <p className="text-xs text-[#64748b] mt-3">Seuil d'alerte : {produit.alertThreshold}</p>
            )}
          </div>
          <Link href="/produits" className="h-10 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors">
            Retour aux produits
          </Link>
        </div>
      </div>
    </div>
  )
}
