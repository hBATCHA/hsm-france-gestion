import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Users, Plus } from "lucide-react"

export default async function ClientsPage() {
  const clients = await prisma.customer.findMany({
    where: { archived: false },
    orderBy: { createdAt: "desc" },
  })

  const total = clients.length

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Clients</h2>
          <p className="text-sm text-[#64748b] mt-1">{total} client{total > 1 ? "s" : ""} actif{total > 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/clients/nouveau"
          className="flex items-center gap-2 h-11 px-5 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
        >
          <Plus size={18} />
          Nouveau client
        </Link>
      </div>

      {/* Tableau */}
      {clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#e2e8f0] rounded-[14px]">
          <Users size={40} className="text-[#cbd5e1] mb-4" />
          <p className="text-[#64748b] font-medium">Aucun client pour l'instant</p>
          <p className="text-sm text-[#94a3b8] mt-1">Commencez par créer votre premier client</p>
          <Link
            href="/clients/nouveau"
            className="mt-5 flex items-center gap-2 h-10 px-5 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
          >
            <Plus size={16} />
            Nouveau client
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Client</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Téléphone</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">E-mail</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Délai paiement</th>
                <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Statut</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-6 py-4 border-b border-[#e2e8f0]">
                    <Link href={`/clients/${client.id}`} className="font-medium text-[#111827] hover:text-[#166534]">
                      {client.companyName}
                    </Link>
                    {client.contactName && (
                      <p className="text-xs text-[#64748b] mt-0.5">{client.contactName}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                    {client.phone ?? "—"}
                  </td>
                  <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                    {client.email ?? "—"}
                  </td>
                  <td className="px-6 py-4 border-b border-[#e2e8f0] text-sm text-[#64748b]">
                    {client.paymentDelay} jours
                  </td>
                  <td className="px-6 py-4 border-b border-[#e2e8f0]">
                    <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">
                      Actif
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
