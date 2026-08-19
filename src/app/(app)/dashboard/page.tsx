import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Users, Package, FileText, ClipboardList, AlertTriangle } from "lucide-react"

export default async function DashboardPage() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    clients,
    produits,
    stockFaible,
    factures,
    facturesEnAttente,
    derniersBL,
    dernieresFact,
  ] = await Promise.all([
    prisma.customer.count({ where: { archived: false } }),
    prisma.product.count({ where: { archived: false } }),
    prisma.product.findMany({
      where: { archived: false, alertThreshold: { gt: 0 } },
      select: { stock: true, alertThreshold: true },
    }),
    prisma.invoice.findMany({
      where: { createdAt: { gte: startOfMonth } },
      select: { totalTTC: true },
    }),
    prisma.invoice.findMany({
      where: { status: "en attente" },
      select: { totalTTC: true },
    }),
    prisma.deliveryNote.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { customer: true, lines: true },
    }),
    prisma.invoice.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { customer: true },
    }),
  ])

  const caMois = factures.reduce((acc, f) => acc + Number(f.totalTTC), 0)
  const montantEnAttente = facturesEnAttente.reduce((acc, f) => acc + Number(f.totalTTC), 0)
  const nbStockFaible = stockFaible.filter(p => p.stock <= p.alertThreshold).length

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#111827]">Tableau de bord</h2>
        <p className="text-sm text-[#64748b] mt-1">
          {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#64748b] font-medium">CA du mois</p>
            <div className="w-8 h-8 bg-[#f0fdf4] rounded-lg flex items-center justify-center">
              <FileText size={16} className="text-[#166534]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#111827]">
            {caMois.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
          </p>
          <p className="text-xs text-[#64748b] mt-1">Factures émises ce mois</p>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#64748b] font-medium">En attente</p>
            <div className="w-8 h-8 bg-[#fff7ed] rounded-lg flex items-center justify-center">
              <FileText size={16} className="text-[#d97706]" />
            </div>
          </div>
          <p className={`text-2xl font-bold ${montantEnAttente > 0 ? "text-[#d97706]" : "text-[#111827]"}`}>
            {montantEnAttente.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
          </p>
          <p className="text-xs text-[#64748b] mt-1">{facturesEnAttente.length} facture{facturesEnAttente.length > 1 ? "s" : ""} non payée{facturesEnAttente.length > 1 ? "s" : ""}</p>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#64748b] font-medium">Clients actifs</p>
            <div className="w-8 h-8 bg-[#f0fdf4] rounded-lg flex items-center justify-center">
              <Users size={16} className="text-[#166534]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#111827]">{clients}</p>
          <p className="text-xs text-[#64748b] mt-1">
            <Link href="/clients" className="hover:text-[#166534]">Voir les clients →</Link>
          </p>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#64748b] font-medium">Stock faible</p>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${nbStockFaible > 0 ? "bg-[#fef2f2]" : "bg-[#f0fdf4]"}`}>
              <AlertTriangle size={16} className={nbStockFaible > 0 ? "text-[#dc2626]" : "text-[#166534]"} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${nbStockFaible > 0 ? "text-[#dc2626]" : "text-[#111827]"}`}>{nbStockFaible}</p>
          <p className="text-xs text-[#64748b] mt-1">
            <Link href="/produits" className="hover:text-[#166534]">sur {produits} produits →</Link>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Derniers BL */}
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <ClipboardList size={16} className="text-[#166534]" />
              <h3 className="text-sm font-semibold text-[#111827]">Derniers bons de livraison</h3>
            </div>
            <Link href="/bons-de-livraison" className="text-xs text-[#166534] hover:underline">Voir tout</Link>
          </div>
          {derniersBL.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-[#94a3b8]">Aucun bon de livraison</div>
          ) : (
            <div className="divide-y divide-[#e2e8f0]">
              {derniersBL.map(bl => {
                const totalHT = bl.lines.reduce((acc, l) => acc + l.quantity * Number(l.unitPrice), 0)
                return (
                  <div key={bl.id} className="flex items-center justify-between px-6 py-3 hover:bg-[#f8fafc] transition-colors">
                    <div>
                      <Link href={`/bons-de-livraison/${bl.id}`} className="text-sm font-medium text-[#111827] hover:text-[#166534]">
                        {bl.number}
                      </Link>
                      <p className="text-xs text-[#64748b] mt-0.5">{bl.customer.companyName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#111827]">
                        {totalHT.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                      </p>
                      {bl.invoiced ? (
                        <span className="text-xs text-[#15803d]">Facturé</span>
                      ) : (
                        <span className="text-xs text-[#d97706]">À facturer</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Dernières factures */}
        <div className="bg-white border border-[#e2e8f0] rounded-[14px] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#166534]" />
              <h3 className="text-sm font-semibold text-[#111827]">Dernières factures</h3>
            </div>
            <Link href="/factures" className="text-xs text-[#166534] hover:underline">Voir tout</Link>
          </div>
          {dernieresFact.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-[#94a3b8]">Aucune facture</div>
          ) : (
            <div className="divide-y divide-[#e2e8f0]">
              {dernieresFact.map(f => {
                const isOverdue = f.status === "en attente" && new Date(f.dueDate) < now
                return (
                  <div key={f.id} className="flex items-center justify-between px-6 py-3 hover:bg-[#f8fafc] transition-colors">
                    <div>
                      <Link href={`/factures/${f.id}`} className="text-sm font-medium text-[#111827] hover:text-[#166534]">
                        {f.number}
                      </Link>
                      <p className="text-xs text-[#64748b] mt-0.5">{f.customer.companyName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#111827]">
                        {Number(f.totalTTC).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                      </p>
                      {f.status === "payée" ? (
                        <span className="text-xs text-[#15803d]">Payée</span>
                      ) : isOverdue ? (
                        <span className="text-xs text-[#dc2626]">En retard</span>
                      ) : (
                        <span className="text-xs text-[#d97706]">En attente</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
