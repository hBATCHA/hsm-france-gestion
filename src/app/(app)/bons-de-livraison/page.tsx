import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, ClipboardList } from "lucide-react"

export default async function BonsLivraisonPage() {
  const bons = await prisma.deliveryNote.findMany({
    include: { customer: true, lines: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Bons de livraison</h2>
          <p className="text-sm text-[#64748b] mt-1">{bons.length} bon{bons.length > 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/bons-de-livraison/nouveau"
          className="flex items-center gap-2 h-11 px-5 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
        >
          <Plus size={18} />
          Nouveau BL
        </Link>
      </div>

      {bons.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#e2e8f0] rounded-[14px]">
          <ClipboardList size={40} className="text-[#cbd5e1] mb-4" />
          <p className="text-[#64748b] font-medium">Aucun bon de livraison</p>
          <p className="text-sm text-[#94a3b8] mt-1">Créez votre premier bon de livraison</p>
          <Link
            href="/bons-de-livraison/nouveau"
            className="mt-5 flex items-center gap-2 h-10 px-5 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
          >
            <Plus size={16} />
            Nouveau BL
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
                <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Total HT</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Statut</th>
              </tr>
            </thead>
            <tbody>
              {bons.map(bon => {
                const totalHT = bon.lines.reduce((acc, l) => acc + l.quantity * Number(l.unitPrice), 0)
                return (
                  <tr key={bon.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4 border-b border-[#e2e8f0]">
                      <Link href={`/bons-de-livraison/${bon.id}`} className="font-medium text-[#111827] hover:text-[#166534]">
                        {bon.number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                      {bon.customer.companyName}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                      {new Date(bon.date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-right font-medium text-[#111827]">
                      {totalHT.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </td>
                    <td className="px-6 py-4 border-b border-[#e2e8f0]">
                      {bon.invoiced ? (
                        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">Facturé</span>
                      ) : (
                        <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fff7ed] text-[#d97706]">À facturer</span>
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
