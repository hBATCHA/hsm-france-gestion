import { prisma } from "@/lib/prisma"
import { unarchiveCustomer } from "@/app/actions/customers"
import { unarchiveProduct } from "@/app/actions/products"
import { ArchiveRestore } from "lucide-react"

export default async function ArchivesPage() {
  const [clients, produits] = await Promise.all([
    prisma.customer.findMany({ where: { archived: true }, orderBy: { companyName: "asc" } }),
    prisma.product.findMany({ where: { archived: true }, orderBy: { name: "asc" } }),
  ])

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#111827]">Archives</h2>
        <p className="text-sm text-[#64748b] mt-1">{clients.length + produits.length} élément{clients.length + produits.length > 1 ? "s" : ""} archivé{clients.length + produits.length > 1 ? "s" : ""}</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Clients archivés */}
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#e2e8f0] bg-[#f8fafc]">
            <h3 className="text-sm font-semibold text-[#111827]">Clients archivés ({clients.length})</h3>
          </div>
          {clients.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[#94a3b8] text-center">Aucun client archivé</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="text-left text-sm font-semibold text-[#334155] px-6 py-3 border-b border-[#e2e8f0]">Raison sociale</th>
                  <th className="text-left text-sm font-semibold text-[#334155] px-6 py-3 border-b border-[#e2e8f0]">Contact</th>
                  <th className="text-left text-sm font-semibold text-[#334155] px-6 py-3 border-b border-[#e2e8f0]">Email</th>
                  <th className="px-6 py-3 border-b border-[#e2e8f0]" />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => {
                  const restore = unarchiveCustomer.bind(null, client.id)
                  return (
                    <tr key={client.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#111827]">{client.companyName}</td>
                      <td className="px-6 py-4 text-sm text-[#64748b]">{client.contactName ?? "—"}</td>
                      <td className="px-6 py-4 text-sm text-[#64748b]">{client.email ?? "—"}</td>
                      <td className="px-6 py-4 text-right">
                        <form action={restore}>
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 h-8 px-3 border border-[#e2e8f0] text-xs font-medium text-[#64748b] rounded-lg hover:bg-[#f0fdf4] hover:text-[#166534] hover:border-[#166534] transition-colors ml-auto"
                          >
                            <ArchiveRestore size={14} />
                            Désarchiver
                          </button>
                        </form>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Produits archivés */}
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[#e2e8f0] bg-[#f8fafc]">
            <h3 className="text-sm font-semibold text-[#111827]">Produits archivés ({produits.length})</h3>
          </div>
          {produits.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[#94a3b8] text-center">Aucun produit archivé</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="text-left text-sm font-semibold text-[#334155] px-6 py-3 border-b border-[#e2e8f0]">Produit</th>
                  <th className="text-left text-sm font-semibold text-[#334155] px-6 py-3 border-b border-[#e2e8f0]">Catégorie</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-3 border-b border-[#e2e8f0]">Prix HT</th>
                  <th className="px-6 py-3 border-b border-[#e2e8f0]" />
                </tr>
              </thead>
              <tbody>
                {produits.map(produit => {
                  const restore = unarchiveProduct.bind(null, produit.id)
                  return (
                    <tr key={produit.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-[#111827]">{produit.name}</p>
                        {produit.reference && <p className="text-xs text-[#64748b] mt-0.5">Réf. {produit.reference}</p>}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#64748b]">{produit.category ?? "—"}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-[#111827]">
                        {Number(produit.sellingPrice).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={restore}>
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 h-8 px-3 border border-[#e2e8f0] text-xs font-medium text-[#64748b] rounded-lg hover:bg-[#f0fdf4] hover:text-[#166534] hover:border-[#166534] transition-colors ml-auto"
                          >
                            <ArchiveRestore size={14} />
                            Désarchiver
                          </button>
                        </form>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
