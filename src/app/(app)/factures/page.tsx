import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { FileText } from "lucide-react"

export default async function FacturesPage() {
  const factures = await prisma.invoice.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  })

  const totalEnAttente = factures
    .filter(f => f.status === "en attente")
    .reduce((acc, f) => acc + Number(f.totalTTC), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Factures</h2>
          <p className="text-sm text-[#64748b] mt-1">{factures.length} facture{factures.length > 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <p className="text-xs text-[#64748b] font-medium">Total factures</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">{factures.length}</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <p className="text-xs text-[#64748b] font-medium">En attente</p>
          <p className={`text-2xl font-bold mt-1 ${factures.filter(f => f.status === "en attente").length > 0 ? "text-[#d97706]" : "text-[#111827]"}`}>
            {factures.filter(f => f.status === "en attente").length}
          </p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <p className="text-xs text-[#64748b] font-medium">Montant en attente</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">
            {totalEnAttente.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
          </p>
        </div>
      </div>

      {factures.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#e2e8f0] rounded-[14px]">
          <FileText size={40} className="text-[#cbd5e1] mb-4" />
          <p className="text-[#64748b] font-medium">Aucune facture</p>
          <p className="text-sm text-[#94a3b8] mt-1">Les factures sont générées depuis les bons de livraison</p>
          <Link
            href="/bons-de-livraison"
            className="mt-5 flex items-center gap-2 h-10 px-5 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
          >
            Voir les bons de livraison
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Numéro</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Client</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Date</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Échéance</th>
                <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Total TTC</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Statut</th>
              </tr>
            </thead>
            <tbody>
              {factures.map(facture => {
                const isOverdue = facture.status === "en attente" && new Date(facture.dueDate) < new Date()
                return (
                  <tr key={facture.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4 border-b border-[#e2e8f0]">
                      <Link href={`/factures/${facture.id}`} className="font-medium text-[#111827] hover:text-[#166534]">
                        {facture.number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                      {facture.customer.companyName}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                      {new Date(facture.date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                      <span className={isOverdue ? "text-[#dc2626] font-medium" : ""}>
                        {new Date(facture.dueDate).toLocaleDateString("fr-FR")}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-right font-medium text-[#111827]">
                      {Number(facture.totalTTC).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0]">
                      {facture.status === "payée" ? (
                        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">Payée</span>
                      ) : isOverdue ? (
                        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fef2f2] text-[#dc2626]">En retard</span>
                      ) : (
                        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fff7ed] text-[#d97706]">En attente</span>
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
