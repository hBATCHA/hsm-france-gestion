import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { createInvoiceFromDeliveryNote } from "@/app/actions/invoices"
import { FileText } from "lucide-react"

export default async function BonLivraisonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bl = await prisma.deliveryNote.findUnique({
    where: { id },
    include: {
      customer: true,
      lines: { include: { product: true } },
      invoice: true,
    },
  })

  if (!bl) notFound()

  const totalHT = bl.lines.reduce((acc, l) => acc + l.quantity * Number(l.unitPrice), 0)
  const totalTVA = bl.lines.reduce((acc, l) => acc + l.quantity * Number(l.unitPrice) * Number(l.vatRate) / 100, 0)
  const totalTTC = totalHT + totalTVA

  const facturer = createInvoiceFromDeliveryNote.bind(null, bl.id)

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[#111827]">{bl.number}</h2>
            {bl.invoiced ? (
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">Facturé</span>
            ) : (
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#fff7ed] text-[#d97706]">À facturer</span>
            )}
          </div>
          <p className="text-sm text-[#64748b]">
            {new Date(bl.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!bl.invoiced && (
            <form action={facturer}>
              <button
                type="submit"
                className="flex items-center gap-2 h-10 px-4 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
              >
                <FileText size={16} />
                Facturer
              </button>
            </form>
          )}
          {bl.invoice && (
            <Link
              href={`/factures/${bl.invoice.id}`}
              className="flex items-center gap-2 h-10 px-4 border border-[#166534] text-[#166534] text-sm font-semibold rounded-[10px] hover:bg-[#f0fdf4] transition-colors"
            >
              <FileText size={16} />
              Voir la facture
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="text-left text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Produit</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Qté</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Prix HT</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">TVA</th>
                  <th className="text-right text-sm font-semibold text-[#334155] px-6 py-4 border-b border-[#e2e8f0]">Total HT</th>
                </tr>
              </thead>
              <tbody>
                {bl.lines.map(line => (
                  <tr key={line.id} className="border-b border-[#e2e8f0] last:border-0">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#111827]">{line.product.name}</p>
                      {line.product.reference && (
                        <p className="text-xs text-[#64748b] mt-0.5">Réf. {line.product.reference}</p>
                      )}
                    </td>
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

          {bl.notes && (
            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-2">Notes</h3>
              <p className="text-sm text-[#64748b] whitespace-pre-wrap">{bl.notes}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Client</h3>
            <Link href={`/clients/${bl.customer.id}`} className="text-sm font-semibold text-[#166534] hover:underline">
              {bl.customer.companyName}
            </Link>
            {bl.customer.contactName && (
              <p className="text-sm text-[#64748b] mt-1">{bl.customer.contactName}</p>
            )}
            {bl.customer.phone && (
              <p className="text-sm text-[#64748b] mt-0.5">{bl.customer.phone}</p>
            )}
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Totaux</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#64748b]">Total HT</span>
                <span className="font-medium text-[#111827]">
                  {totalHT.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748b]">TVA</span>
                <span className="font-medium text-[#111827]">
                  {totalTVA.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="border-t border-[#e2e8f0] pt-3 flex justify-between">
                <span className="text-sm font-semibold text-[#111827]">Total TTC</span>
                <span className="text-lg font-bold text-[#166534]">
                  {totalTTC.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/bons-de-livraison"
            className="h-10 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
          >
            Retour aux BL
          </Link>
        </div>
      </div>
    </div>
  )
}
