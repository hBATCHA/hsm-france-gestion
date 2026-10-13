"use client"

import { useTransition } from "react"
import { addPayment } from "@/app/actions/payments"
import { toast } from "sonner"

export default function AddPaymentForm({ invoiceId, remaining }: { invoiceId: string; remaining: number }) {
  const [isPending, startTransition] = useTransition()
  const addPay = addPayment.bind(null, invoiceId)

  function handleSubmit(formData: FormData) {
    toast.success("Paiement enregistré !")
    startTransition(() => addPay(formData))
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
      <p className="text-sm font-medium text-[#111827]">Enregistrer un paiement</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#64748b]">Montant (€)</label>
          <input
            name="amount"
            type="text"
            inputMode="decimal"
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
        disabled={isPending}
        className="h-10 bg-[#166534] hover:bg-[#14532d] disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
      >
        {isPending ? "Enregistrement..." : "Enregistrer le paiement"}
      </button>
    </form>
  )
}
