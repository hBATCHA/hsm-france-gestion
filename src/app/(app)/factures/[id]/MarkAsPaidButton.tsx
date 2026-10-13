"use client"

import { useTransition } from "react"
import { markAsPaid } from "@/app/actions/invoices"
import { CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function MarkAsPaidButton({ invoiceId }: { invoiceId: string }) {
  const [isPending, startTransition] = useTransition()
  const pay = markAsPaid.bind(null, invoiceId)

  function handleSubmit() {
    toast.success("Facture marquée comme payée !")
    startTransition(() => pay())
  }

  return (
    <form action={handleSubmit}>
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 h-10 px-4 bg-[#166534] hover:bg-[#14532d] disabled:opacity-60 text-white text-sm font-semibold rounded-[10px] transition-colors"
      >
        <CheckCircle size={16} />
        {isPending ? "Enregistrement..." : "Marquer comme payée"}
      </button>
    </form>
  )
}
