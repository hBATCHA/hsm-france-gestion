"use client"

import { useState, useTransition } from "react"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { updatePayment, deletePayment } from "@/app/actions/payments"

type Payment = {
  id: string
  amount: number
  date: Date | string
  method: string
  note: string | null
}

export default function PaymentHistory({ payments, invoiceId }: { payments: Payment[]; invoiceId: string }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (payments.length === 0) return null

  const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0)

  return (
    <div className="mb-4 flex flex-col gap-1">
      {payments.map(p => {
        const isEditing = editingId === p.id

        if (isEditing) {
          return (
            <form
              key={p.id}
              onSubmit={e => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                startTransition(async () => {
                  await updatePayment(p.id, invoiceId, formData)
                  setEditingId(null)
                })
              }}
              className="border border-[#166534] rounded-lg p-3 bg-[#f0fdf4]"
            >
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#64748b]">Montant (€)</label>
                  <input name="amount" type="number" step="0.01" min="0.01" required defaultValue={p.amount}
                    className="h-9 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#64748b]">Date</label>
                  <input name="date" type="date" required defaultValue={new Date(p.date).toISOString().split("T")[0]}
                    className="h-9 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#64748b]">Moyen de paiement</label>
                  <select name="method" defaultValue={p.method}
                    className="h-9 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] bg-white">
                    <option value="virement">Virement</option>
                    <option value="chèque">Chèque</option>
                    <option value="espèces">Espèces</option>
                    <option value="carte">Carte</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#64748b]">Note</label>
                  <input name="note" type="text" defaultValue={p.note ?? ""}
                    className="h-9 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534]" />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" disabled={isPending}
                  className="flex items-center gap-1 h-8 px-3 bg-[#166534] text-white text-xs font-semibold rounded-lg hover:bg-[#14532d] transition-colors">
                  <Check size={13} /> Enregistrer
                </button>
                <button type="button" onClick={() => setEditingId(null)}
                  className="flex items-center gap-1 h-8 px-3 border border-[#e2e8f0] text-xs font-medium text-[#64748b] rounded-lg hover:bg-[#f8fafc] transition-colors">
                  <X size={13} /> Annuler
                </button>
              </div>
            </form>
          )
        }

        return (
          <div key={p.id} className="flex items-center justify-between py-2 border-b border-[#e2e8f0] last:border-0">
            <div>
              <p className="text-sm font-medium text-[#111827]">
                {p.amount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
              </p>
              <p className="text-xs text-[#64748b] mt-0.5">
                {new Date(p.date).toLocaleDateString("fr-FR")} · {p.method}
                {p.note && ` · ${p.note}`}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setEditingId(p.id)}
                className="h-8 w-8 flex items-center justify-center text-[#94a3b8] hover:text-[#166534] transition-colors">
                <Pencil size={14} />
              </button>
              <form onSubmit={e => {
                e.preventDefault()
                startTransition(async () => {
                  await deletePayment(p.id, invoiceId)
                })
              }}>
                <button type="submit" disabled={isPending}
                  className="h-8 w-8 flex items-center justify-center text-[#94a3b8] hover:text-[#dc2626] transition-colors">
                  <Trash2 size={14} />
                </button>
              </form>
            </div>
          </div>
        )
      })}

      <div className="flex justify-between pt-2 text-sm">
        <span className="text-[#64748b]">Total payé</span>
        <span className="font-semibold text-[#166534]">
          {totalPaid.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
        </span>
      </div>
    </div>
  )
}
