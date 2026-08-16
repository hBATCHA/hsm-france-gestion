import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Package, Plus } from "lucide-react"

export default async function ProduitsPage() {
  const produits = await prisma.product.findMany({
    where: { archived: false },
    orderBy: { createdAt: "desc" },
  })

  const stockFaible = produits.filter(p => p.stock <= p.alertThreshold && p.alertThreshold > 0)
  const valeurStock = produits.reduce((acc, p) => acc + Number(p.sellingPrice) * p.stock, 0)

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Produits</h2>
          <p className="text-sm text-[#64748b] mt-1">{produits.length} produit{produits.length > 1 ? "s" : ""} actif{produits.length > 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/produits/nouveau"
          className="flex items-center gap-2 h-11 px-5 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
        >
          <Plus size={18} />
          Nouveau produit
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <p className="text-xs text-[#64748b] font-medium">Produits actifs</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">{produits.length}</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <p className="text-xs text-[#64748b] font-medium">Stock faible</p>
          <p className={`text-2xl font-bold mt-1 ${stockFaible.length > 0 ? "text-[#d97706]" : "text-[#111827]"}`}>
            {stockFaible.length}
          </p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <p className="text-xs text-[#64748b] font-medium">Valeur du stock</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">
            {valeurStock.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
          </p>
        </div>
      </div>

      {/* Tableau */}
      {produits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#e2e8f0] rounded-[14px]">
          <Package size={40} className="text-[#cbd5e1] mb-4" />
          <p className="text-[#64748b] font-medium">Aucun produit pour l'instant</p>
          <p className="text-sm text-[#94a3b8] mt-1">Commencez par créer votre premier produit</p>
          <Link
            href="/produits/nouveau"
            className="mt-5 flex items-center gap-2 h-10 px-5 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
          >
            <Plus size={16} />
            Nouveau produit
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Produit</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Catégorie</th>
                <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Prix HT</th>
                <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Stock</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Statut</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => {
                const isLowStock = produit.alertThreshold > 0 && produit.stock <= produit.alertThreshold
                const isOutOfStock = produit.stock === 0
                return (
                  <tr key={produit.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4 border-b border-[#e2e8f0]">
                      <Link href={`/produits/${produit.id}`} className="font-medium text-[#111827] hover:text-[#166534]">
                        {produit.name}
                      </Link>
                      {produit.reference && (
                        <p className="text-xs text-[#64748b] mt-0.5">Réf. {produit.reference}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                      {produit.category ?? "—"}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-right font-medium text-[#111827]">
                      {Number(produit.sellingPrice).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-right font-medium">
                      <span className={isOutOfStock ? "text-[#dc2626]" : isLowStock ? "text-[#d97706]" : "text-[#111827]"}>
                        {produit.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0]">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fef2f2] text-[#dc2626]">Rupture</span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fff7ed] text-[#d97706]">Stock faible</span>
                      ) : (
                        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">OK</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
