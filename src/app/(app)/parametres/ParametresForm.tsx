"use client"

import { useState, useTransition } from "react"
import { updateCompany, addCompany, setActiveCompany, deleteCompany } from "@/app/actions/settings"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

type Company = {
  id: string
  name: string
  legalForm: string
  capital: string
  address: string
  email: string
  phone: string
  siret: string
  vatNumber: string
  rcs: string
  iban: string
  bic: string
  bank: string
  isActive: boolean
}

const INPUT_CLASS = "h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"

export default function ParametresForm({ companies }: { companies: Company[] }) {
  const active = companies.find(c => c.isActive) ?? null
  const [selectedId, setSelectedId] = useState<string | null>(active?.id ?? null)
  const [isPending, startTransition] = useTransition()

  const selected = selectedId ? companies.find(c => c.id === selectedId) ?? null : null
  const isCreating = selectedId === null

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (isCreating) {
        await addCompany(formData)
        toast.success("Société créée !")
      } else {
        await updateCompany(selectedId!, formData)
        toast.success("Paramètres enregistrés !")
      }
    })
  }

  function handleActivate(id: string) {
    startTransition(async () => {
      await setActiveCompany(id)
      toast.success("Société activée !")
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteCompany(id)
      if (selectedId === id) setSelectedId(active?.id ?? null)
      toast.success("Société supprimée.")
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cartes sociétés */}
      <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#111827] mb-4">Mes sociétés</h3>
        <div className="flex flex-wrap gap-3">
          {companies.map(c => (
            <div
              key={c.id}
              className={`flex flex-col gap-2 p-4 rounded-[12px] border w-64 ${selectedId === c.id ? "border-[#166534] bg-[#f0fdf4]" : "border-[#e2e8f0] bg-white"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-[#111827] leading-tight">{c.name || "Sans nom"}</p>
                  {c.legalForm && <p className="text-xs text-[#64748b] mt-0.5">{c.legalForm}</p>}
                </div>
                {c.isActive && (
                  <span className="shrink-0 text-xs font-semibold text-[#166534] bg-[#dcfce7] px-2 py-0.5 rounded-full">Active</span>
                )}
              </div>
              <div className="flex gap-2 mt-1">
                {!c.isActive && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleActivate(c.id)}
                    className="flex-1 h-8 text-xs font-semibold text-[#166534] border border-[#166534] rounded-lg hover:bg-[#f0fdf4] transition-colors disabled:opacity-50"
                  >
                    Activer
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className="flex-1 h-8 text-xs font-semibold text-[#475569] border border-[#e2e8f0] rounded-lg hover:bg-[#f8fafc] transition-colors"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  disabled={isPending || c.isActive || companies.length <= 1}
                  onClick={() => handleDelete(c.id)}
                  title={c.isActive ? "Impossible de supprimer la société active" : companies.length <= 1 ? "Impossible de supprimer la seule société" : "Supprimer"}
                  className="h-8 w-8 flex items-center justify-center text-[#ef4444] border border-[#e2e8f0] rounded-lg hover:bg-[#fef2f2] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="w-64 h-auto min-h-[96px] flex flex-col items-center justify-center gap-1.5 p-4 rounded-[12px] border-2 border-dashed border-[#cbd5e1] text-[#64748b] hover:border-[#166534] hover:text-[#166534] transition-colors"
          >
            <span className="text-xl font-light">+</span>
            <span className="text-xs font-semibold">Ajouter une société</span>
          </button>
        </div>
      </div>

      {/* Formulaire */}
      <form action={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">

            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-1">
                {isCreating ? "Nouvelle société" : `Modifier — ${selected?.name || "Sans nom"}`}
              </h3>
              <p className="text-xs text-[#64748b] mb-5">{isCreating ? "Remplissez les informations de la nouvelle société." : "Modifiez les informations de cette société."}</p>

              <h4 className="text-sm font-semibold text-[#475569] mb-4">Identité de l'entreprise</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Raison sociale</label>
                  <input key={selectedId ?? "new"} name="name" type="text" defaultValue={selected?.name ?? ""} className={INPUT_CLASS} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Forme juridique</label>
                  <input key={selectedId ?? "new"} name="legalForm" type="text" placeholder="SARL, SAS, auto-entrepreneur..." defaultValue={selected?.legalForm ?? ""} className={INPUT_CLASS} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Capital social</label>
                  <input key={selectedId ?? "new"} name="capital" type="text" placeholder="Ex : 10 000,00 €" defaultValue={selected?.capital ?? ""} className={INPUT_CLASS} />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Adresse du siège social</label>
                  <textarea key={selectedId ?? "new"} name="address" rows={2} defaultValue={selected?.address ?? ""} placeholder="Ex : 1 Rue de la Paix, 75001 Paris" className="px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 resize-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Email</label>
                  <input key={selectedId ?? "new"} name="email" type="email" defaultValue={selected?.email ?? ""} className={INPUT_CLASS} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Téléphone</label>
                  <input key={selectedId ?? "new"} name="phone" type="text" defaultValue={selected?.phone ?? ""} className={INPUT_CLASS} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h4 className="text-sm font-semibold text-[#475569] mb-4">Informations légales</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">SIRET</label>
                  <input key={selectedId ?? "new"} name="siret" type="text" placeholder="Ex : 123 456 789 00012" defaultValue={selected?.siret ?? ""} className={INPUT_CLASS} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">N° TVA intracommunautaire</label>
                  <input key={selectedId ?? "new"} name="vatNumber" type="text" placeholder="Ex : FR12 123456789" defaultValue={selected?.vatNumber ?? ""} className={INPUT_CLASS} />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">RCS</label>
                  <input key={selectedId ?? "new"} name="rcs" type="text" placeholder="Ex : RCS Paris B 123 456 789" defaultValue={selected?.rcs ?? ""} className={INPUT_CLASS} />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h4 className="text-sm font-semibold text-[#475569] mb-4">Coordonnées bancaires</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">IBAN</label>
                  <input key={selectedId ?? "new"} name="iban" type="text" placeholder="Ex : FR76 3000 6000 0112 3456 7890 189" defaultValue={selected?.iban ?? ""} className={INPUT_CLASS} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">BIC</label>
                  <input key={selectedId ?? "new"} name="bic" type="text" placeholder="Ex : BNPAFRPP" defaultValue={selected?.bic ?? ""} className={INPUT_CLASS} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Banque</label>
                  <input key={selectedId ?? "new"} name="bank" type="text" placeholder="Ex : BNP Paribas" defaultValue={selected?.bank ?? ""} className={INPUT_CLASS} />
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
              disabled={isPending}
              className="h-11 bg-[#166534] hover:bg-[#14532d] disabled:opacity-60 text-white text-sm font-semibold rounded-[10px] transition-colors"
            >
              {isPending ? "Enregistrement..." : isCreating ? "Créer la société" : "Enregistrer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
