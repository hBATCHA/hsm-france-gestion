import { prisma } from "@/lib/prisma"
import { updateSettings } from "@/app/actions/settings"

export default async function ParametresPage() {
  const settings = await prisma.companySettings.findUnique({ where: { id: "default" } })

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#111827]">Paramètres</h2>
        <p className="text-sm text-[#64748b] mt-1">Informations de votre entreprise utilisées sur les factures</p>
      </div>

      <form action={updateSettings}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">

            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-5">Identité de l'entreprise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Raison sociale</label>
                  <input name="name" type="text" defaultValue={settings?.name ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Forme juridique</label>
                  <input name="legalForm" type="text" placeholder="SARL, SAS, auto-entrepreneur..." defaultValue={settings?.legalForm ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Capital social</label>
                  <input name="capital" type="text" placeholder="Ex : 10 000,00 €" defaultValue={settings?.capital ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Adresse du siège social</label>
                  <textarea name="address" rows={2} defaultValue={settings?.address ?? ""} placeholder="Ex : 1 Rue de la Paix, 75001 Paris" className="px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 resize-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Email</label>
                  <input name="email" type="email" defaultValue={settings?.email ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Téléphone</label>
                  <input name="phone" type="text" defaultValue={settings?.phone ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-5">Informations légales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">SIRET</label>
                  <input name="siret" type="text" placeholder="Ex : 123 456 789 00012" defaultValue={settings?.siret ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">N° TVA intracommunautaire</label>
                  <input name="vatNumber" type="text" placeholder="Ex : FR12 123456789" defaultValue={settings?.vatNumber ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">RCS</label>
                  <input name="rcs" type="text" placeholder="Ex : RCS Paris B 123 456 789" defaultValue={settings?.rcs ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-5">Coordonnées bancaires</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">IBAN</label>
                  <input name="iban" type="text" placeholder="Ex : FR76 3000 6000 0112 3456 7890 189" defaultValue={settings?.iban ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">BIC</label>
                  <input name="bic" type="text" placeholder="Ex : BNPAFRPP" defaultValue={settings?.bic ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Banque</label>
                  <input name="bank" type="text" placeholder="Ex : BNP Paribas" defaultValue={settings?.bank ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-[14px] p-6">
              <p className="text-sm font-semibold text-[#111827] mb-2">Ces informations apparaissent sur</p>
              <ul className="text-sm text-[#64748b] space-y-1">
                <li>• Les factures PDF</li>
                <li>• L'en-tête émetteur</li>
                <li>• Les mentions légales</li>
                <li>• Les coordonnées bancaires</li>
              </ul>
            </div>
            <button
              type="submit"
              className="h-11 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
