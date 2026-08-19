import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { markAsPaid } from "@/app/actions/invoices"
import { addPayment } from "@/app/actions/payments"
import { CheckCircle, Download } from "lucide-react"
import PaymentHistory from "./PaymentHistory"

export default async function FactureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const facture = await prisma.invoice.findUnique({
    where: { id },
    include: {
      customer: true,
      lines: true,
      deliveryNote: true,
      payments: { orderBy: { date: "asc" } },
    },
  })

  if (!facture) notFound()

  const isOverdue = facture.status === "en attente" && new Date(facture.dueDate) < new Date()
  const totalPaid = facture.payments.reduce((acc, p) => acc + Number(p.amount), 0)
  const remaining = Number(facture.totalTTC) - totalPaid

  const pay = markAsPaid.bind(null, id)
  const addPay = addPayment.bind(null, id)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[#111827]">{facture.number}</h2>
            {facture.status === "payée" ? (
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">Payée</span>
            ) : isOverdue ? (
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fef2f2] text-[#dc2626]">En retard</span>
            ) : (
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fff7ed] text-[#d97706]">En attente</span>
            )}
          </div>
          <p className="text-sm text-[#64748b]">
            Émise le {new Date(facture.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {facture.status !== "payée" && (
            <form action={pay}>
              <button
                type="submit"
                className="flex items-center gap-2 h-10 px-4 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
              >
                <CheckCircle size={16} />
                Marquer comme payée
              </button>
            </form>
          )}
          <a
            href={`/api/factures/${id}/pdf`}
            className="flex items-center gap-2 h-10 px-4 border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
          >
            <Download size={16} />
            PDF avec paiements
          </a>
          <a
            href={`/api/factures/${id}/pdf?original=true`}
            className="flex items-center gap-2 h-10 px-4 border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
          >
            <Download size={16} />
            PDF original
          </a>
          {facture.deliveryNote && (
            <Link
              href={`/bons-de-livraison/${facture.deliveryNote.id}`}
              className="h-10 px-4 flex items-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
            >
              Voir le BL {facture.deliveryNote.number}
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Lignes */}
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Désignation</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Qté</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Prix HT</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">TVA</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Total HT</th>
                </tr>
              </thead>
              <tbody>
                {facture.lines.map(line => (
                  <tr key={line.id} className="border-b border-[#e2e8f0] last:border-0">
                    <td className="px-6 py-4 text-sm font-medium text-[#111827]">{line.label}</td>
                    <td className="px-6 py-4 text-sm text-right text-[#111827]">{line.quantity}</td>
                    <td className="px-6 py-4 text-sm text-right text-[#111827]">
                      {Number(line.unitPrice).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-[#64748b]">{Number(line.vatRate)} %</td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-[#111827]">
                      {(line.quantity * Number(line.unitPrice)).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Historique des paiements */}
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Paiements</h3>

            <PaymentHistory
              payments={facture.payments.map(p => ({ ...p, amount: Number(p.amount) }))}
              invoiceId={id}
            />
            {remaining > 0 && facture.payments.length > 0 && (
              <div className="flex justify-between text-sm mb-4">
                <span className="text-[#64748b]">Reste à payer</span>
                <span className="font-bold text-[#dc2626]">
                  {remaining.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
            )}

            {facture.status !== "payée" && (
              <form action={addPay} className="flex flex-col gap-3">
                <p className="text-sm font-medium text-[#111827]">Enregistrer un paiement</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-[#64748b]">Montant (€)</label>
                    <input
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      defaultValue={remaining > 0 ? remaining.toFixed(2) : ""}
                      className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-[#64748b]">Date</label>
                    <input
                      name="date"
                      type="date"
                      required
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-[#64748b]">Moyen de paiement</label>
                    <select
                      name="method"
                      className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] bg-white"
                    >
                      <option value="virement">Virement</option>
                      <option value="chèque">Chèque</option>
                      <option value="espèces">Espèces</option>
                      <option value="carte">Carte</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-[#64748b]">Note (optionnel)</label>
                    <input
                      name="note"
                      type="text"
                      placeholder="Ex : chèque n°1234"
                      className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534]"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="h-10 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Enregistrer le paiement
                </button>
              </form>
            )}
          </div>

          {facture.notes && (
            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-2">Notes</h3>
              <p className="text-sm text-[#64748b] whitespace-pre-wrap">{facture.notes}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Client</h3>
            <Link href={`/clients/${facture.customer.id}`} className="text-sm font-semibold text-[#166534] hover:underline">
              {facture.customer.companyName}
            </Link>
            {facture.customer.contactName && (
              <p className="text-sm text-[#64748b] mt-1">{facture.customer.contactName}</p>
            )}
            {facture.customer.billingAddress && (
              <p className="text-sm text-[#64748b] mt-2 whitespace-pre-wrap">{facture.customer.billingAddress}</p>
            )}
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-2">Échéance</h3>
            <p className={`text-sm font-semibold ${isOverdue ? "text-[#dc2626]" : "text-[#111827]"}`}>
              {new Date(facture.dueDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            {isOverdue && <p className="text-xs text-[#dc2626] mt-1">Paiement en retard</p>}
            {facture.paidAt && (
              <p className="text-xs text-[#64748b] mt-2">
                Soldée le {new Date(facture.paidAt).toLocaleDateString("fr-FR")}
              </p>
            )}
          </div>

          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-[14px] p-6">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#64748b]">Total HT</span>
                <span className="font-medium text-[#111827]">
                  {Number(facture.totalHT).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748b]">TVA</span>
                <span className="font-medium text-[#111827]">
                  {Number(facture.totalTVA).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="border-t border-[#dcfce7] pt-3 flex justify-between">
                <span className="text-sm font-semibold text-[#111827]">Total TTC</span>
                <span className="text-lg font-bold text-[#166534]">
                  {Number(facture.totalTTC).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              {totalPaid > 0 && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748b]">Payé</span>
                    <span className="font-medium text-[#15803d]">
                      {totalPaid.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-[#dcfce7] pt-2">
                    <span className="font-semibold text-[#111827]">Reste à payer</span>
                    <span className={`font-bold ${remaining > 0 ? "text-[#dc2626]" : "text-[#15803d]"}`}>
                      {remaining.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <Link
            href="/factures"
            className="h-10 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
          >
            Retour aux factures
          </Link>
        </div>
      </div>
    </div>
  )
}
