"use client"

import { useState, useTransition } from "react"
import { updateCustomer } from "@/app/actions/customers"
import { toast } from "sonner"
import Link from "next/link"

type Client = {
  id: string
  companyName: string
  contactName: string | null
  phone: string | null
  email: string | null
  siret: string | null
  vatNumber: string | null
  billingAddress: string | null
  deliveryAddress: string | null
  paymentDelay: number
  notes: string | null
}

export default function ModifierClientForm({ client }: { client: Client }) {
  const [billingAddress, setBillingAddress] = useState(client.billingAddress ?? "")
  const isSame = !client.deliveryAddress || client.deliveryAddress === client.billingAddress
  const [sameAddress, setSameAddress] = useState(isSame)
  const [isPending, startTransition] = useTransition()

  const update = updateCustomer.bind(null, client.id)

  function handleSubmit(formData: FormData) {
    toast.success("Modifications enregistrées !")
    startTransition(() => update(formData))
  }

  return (
    <form action={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
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

          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-5">Adresses et conditions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-semibold text-[#111827]">Adresse de facturation</label>
                <textarea
                  name="billingAddress"
                  rows={3}
                  value={billingAddress}
                  onChange={e => setBillingAddress(e.target.value)}
                  className="px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] resize-none focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#111827]">Adresse de livraison</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAddress}
                      onChange={e => setSameAddress(e.target.checked)}
                      className="w-4 h-4 accent-[#166534]"
                    />
                    <span className="text-sm text-[#64748b]">Même adresse que la facturation</span>
                  </label>
                </div>
                {sameAddress ? (
                  <input type="hidden" name="deliveryAddress" value={billingAddress} />
                ) : (
                  <textarea
                    name="deliveryAddress"
                    rows={3}
                    defaultValue={!isSame ? (client.deliveryAddress ?? "") : ""}
                    className="px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] resize-none focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Délai de paiement (jours)</label>
                <input name="paymentDelay" type="text" inputMode="numeric" defaultValue={client.paymentDelay} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Notes</label>
                <input name="notes" type="text" defaultValue={client.notes ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="h-11 bg-[#166534] hover:bg-[#14532d] disabled:opacity-60 text-white text-sm font-semibold rounded-[10px] transition-colors"
          >
            {isPending ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
          <Link
            href={`/clients/${client.id}`}
            className="h-11 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
          >
            Annuler
          </Link>
        </div>
      </div>
    </form>
  )
}
