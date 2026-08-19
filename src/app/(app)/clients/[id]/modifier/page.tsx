import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { updateCustomer } from "@/app/actions/customers"
import Link from "next/link"

export default async function ModifierClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await prisma.customer.findUnique({ where: { id } })

  if (!client) notFound()

  const update = updateCustomer.bind(null, id)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Modifier le client</h2>
          <p className="text-sm text-[#64748b] mt-1">{client.companyName}</p>
        </div>
      </div>

      <form action={update}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Informations générales */}
            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-5">Informations générales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">
                    Raison sociale <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="companyName"
                    type="text"
                    required
                    defaultValue={client.companyName}
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Responsable</label>
                  <input name="contactName" type="text" defaultValue={client.contactName ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Téléphone</label>
                  <input name="phone" type="tel" defaultValue={client.phone ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">E-mail</label>
                  <input name="email" type="email" defaultValue={client.email ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">SIRET</label>
                  <input name="siret" type="text" defaultValue={client.siret ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">N° TVA</label>
                  <input name="vatNumber" type="text" defaultValue={client.vatNumber ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
              </div>
            </div>

            {/* Adresses */}
            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-5">Adresses et conditions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Adresse de facturation</label>
                  <textarea name="billingAddress" rows={3} defaultValue={client.billingAddress ?? ""} className="px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] resize-none focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Adresse de livraison</label>
                  <textarea name="deliveryAddress" rows={3} defaultValue={client.deliveryAddress ?? ""} className="px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] resize-none focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Délai de paiement (jours)</label>
                  <input name="paymentDelay" type="number" defaultValue={client.paymentDelay} min={0} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Notes</label>
                  <input name="notes" type="text" defaultValue={client.notes ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="h-11 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
            >
              Enregistrer les modifications
            </button>
            <Link
              href={`/clients/${id}`}
              className="h-11 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
            >
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
