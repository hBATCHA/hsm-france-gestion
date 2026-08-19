import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { archiveCustomer } from "@/app/actions/customers"
import { Pencil, Archive, Mail, Phone, MapPin, FileText } from "lucide-react"

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await prisma.customer.findUnique({ where: { id } })

  if (!client) notFound()

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-[#111827]">{client.companyName}</h2>
            <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold ${client.archived ? "bg-[#f1f5f9] text-[#475569]" : "bg-[#dcfce7] text-[#15803d]"}`}>
              {client.archived ? "Archivé" : "Actif"}
            </span>
          </div>
          {client.contactName && (
            <p className="text-sm text-[#64748b]">{client.contactName}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/clients/${id}/modifier`}
            className="flex items-center gap-2 h-10 px-4 border border-[#166534] text-[#166534] text-sm font-semibold rounded-[10px] hover:bg-[#f0fdf4] transition-colors"
          >
            <Pencil size={16} />
            Modifier
          </Link>
          {!client.archived && (
            <form action={async () => { "use server"; await archiveCustomer(id) }}>
              <button
                type="submit"
                className="flex items-center gap-2 h-10 px-4 border border-[#e2e8f0] text-[#64748b] text-sm font-semibold rounded-[10px] hover:bg-[#fef2f2] hover:text-[#dc2626] hover:border-[#fecaca] transition-colors"
              >
                <Archive size={16} />
                Archiver
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Informations générales */}
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-5">Informations générales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {client.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#64748b] shrink-0" />
                  <div>
                    <p className="text-xs text-[#64748b]">Téléphone</p>
                    <p className="text-sm font-medium text-[#111827]">{client.phone}</p>
                  </div>
                </div>
              )}
              {client.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#64748b] shrink-0" />
                  <div>
                    <p className="text-xs text-[#64748b]">E-mail</p>
                    <p className="text-sm font-medium text-[#111827]">{client.email}</p>
                  </div>
                </div>
              )}
              {client.siret && (
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-[#64748b] shrink-0" />
                  <div>
                    <p className="text-xs text-[#64748b]">SIRET</p>
                    <p className="text-sm font-medium text-[#111827]">{client.siret}</p>
                  </div>
                </div>
              )}
              {client.vatNumber && (
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-[#64748b] shrink-0" />
                  <div>
                    <p className="text-xs text-[#64748b]">N° TVA</p>
                    <p className="text-sm font-medium text-[#111827]">{client.vatNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Adresses */}
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-5">Adresses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-[#64748b]" />
                  <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">Facturation</p>
                </div>
                <p className="text-sm text-[#111827] whitespace-pre-line">{client.billingAddress ?? "—"}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-[#64748b]" />
                  <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wide">Livraison</p>
                </div>
                <p className="text-sm text-[#111827] whitespace-pre-line">{client.deliveryAddress ?? "—"}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {client.notes && (
            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-3">Notes</h3>
              <p className="text-sm text-[#64748b]">{client.notes}</p>
            </div>
          )}
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-[14px] p-6">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Conditions</h3>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs text-[#64748b]">Délai de paiement</p>
                <p className="text-lg font-bold text-[#111827]">{client.paymentDelay} jours</p>
              </div>
            </div>
          </div>

          <Link
            href="/clients"
            className="h-10 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
          >
            Retour aux clients
          </Link>
        </div>
      </div>
    </div>
  )
}
