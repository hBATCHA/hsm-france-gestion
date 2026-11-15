"use client"
import { useState, useTransition } from "react"
import { updateDeliveryNoteCompany } from "@/app/actions/deliveryNotes"
import { toast } from "sonner"

export default function BLCompanySelect({
  blId,
  companies,
  currentCompanyId,
}: {
  blId: string
  companies: { id: string; name: string }[]
  currentCompanyId: string | null
}) {
  const [value, setValue] = useState(currentCompanyId ?? "")
  const [isPending, startTransition] = useTransition()

  function handleSave() {
    startTransition(async () => {
      await updateDeliveryNoteCompany(blId, value || null)
      toast.success("Société mise à jour")
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <select
        value={value}
        onChange={e => setValue(e.target.value)}
        className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] bg-white"
      >
        <option value="">Aucune</option>
        {companies.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button
        onClick={handleSave}
        disabled={isPending}
        className="h-9 bg-[#166534] hover:bg-[#14532d] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
      >
        {isPending ? "Sauvegarde..." : "Sauvegarder"}
      </button>
    </div>
  )
}
