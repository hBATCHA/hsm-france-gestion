import { createCustomer } from "@/app/actions/customers"
import Link from "next/link"

export default function NouveauClientPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Nouveau client</h2>
          <p className="text-sm text-[#64748b] mt-1">Remplissez les informations du client</p>
        </div>
      </div>

      <form action={createCustomer}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
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
                    placeholder="Épicerie Soleil"
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Responsable</label>
                  <input
                    name="contactName"
                    type="text"
                    placeholder="Nom du contact"
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Téléphone</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="01 23 45 67 89"
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">E-mail</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="contact@epicerie.fr"
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">SIRET</label>
                  <input
                    name="siret"
                    type="text"
                    placeholder="123 456 789 00012"
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">N° TVA</label>
                  <input
                    name="vatNumber"
                    type="text"
                    placeholder="FR 12 345678900"
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
              </div>
            </div>

            {/* Adresses et conditions */}
            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-5">Adresses et conditions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Adresse de facturation</label>
                  <textarea
                    name="billingAddress"
                    rows={3}
                    placeholder="12 rue des Lilas, 75011 Paris"
                    className="px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] resize-none focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Adresse de livraison</label>
                  <textarea
                    name="deliveryAddress"
                    rows={3}
                    placeholder="Identique ou différente"
                    className="px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] resize-none focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Délai de paiement (jours)</label>
                  <input
                    name="paymentDelay"
                    type="number"
                    defaultValue={30}
                    min={0}
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Notes</label>
                  <input
                    name="notes"
                    type="text"
                    placeholder="Informations supplémentaires"
                    className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-[14px] p-6">
              <h3 className="text-base font-semibold text-[#111827] mb-4">Statut</h3>
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">
                Actif
              </span>
              <p className="text-xs text-[#64748b] mt-3">Le client sera actif dès sa création.</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="h-11 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
              >
                Enregistrer le client
              </button>
              <Link
                href="/clients"
                className="h-11 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
              >
                Annuler
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
