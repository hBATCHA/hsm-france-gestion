"use client"

import { useTransition, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { createDeliveryNote } from "@/app/actions/deliveryNotes"

type Product = {
  id: string
  name: string
  sellingPrice: number
  vatRate: number
  stock: number
}

type Customer = {
  id: string
  companyName: string
}

type Line = {
  productId: string
  quantity: string
  unitPrice: string
  vatRate: string
  discount: string
}

export default function DeliveryNoteForm({ customers, products }: { customers: Customer[]; products: Product[] }) {
  const [isPending, startTransition] = useTransition()
  const [customerId, setCustomerId] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")
  const [globalDiscount, setGlobalDiscount] = useState("0")
  const [lines, setLines] = useState<Line[]>([{ productId: "", quantity: "1", unitPrice: "0", vatRate: "5.5", discount: "0" }])

  const addLine = () => setLines([...lines, { productId: "", quantity: "1", unitPrice: "0", vatRate: "5.5", discount: "0" }])

  const removeLine = (i: number) => setLines(lines.filter((_, idx) => idx !== i))

  const updateLine = (i: number, field: keyof Line, value: string) => {
    const updated = [...lines]
    if (field === "productId") {
      const product = products.find(p => p.id === value)
      updated[i] = {
        ...updated[i],
        productId: value,
        unitPrice: product ? String(product.sellingPrice) : updated[i].unitPrice,
        vatRate: product ? String(product.vatRate) : updated[i].vatRate,
      }
    } else {
      updated[i] = { ...updated[i], [field]: value }
    }
    setLines(updated)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      await createDeliveryNote({
        customerId,
        date,
        notes,
        globalDiscount: parseFloat(globalDiscount) || 0,
        lines: lines.map(l => ({
          productId: l.productId,
          quantity: parseInt(l.quantity) || 1,
          unitPrice: parseFloat(l.unitPrice) || 0,
          vatRate: parseFloat(l.vatRate) || 0,
          discount: parseFloat(l.discount) || 0,
        })),
      })
    })
  }

  const gd = 1 - (parseFloat(globalDiscount) || 0) / 100
  const totalHT = lines.reduce((acc, l) => acc + (parseInt(l.quantity) || 0) * (parseFloat(l.unitPrice) || 0) * (1 - (parseFloat(l.discount) || 0) / 100) * gd, 0)
  const totalTVA = lines.reduce((acc, l) => acc + (parseInt(l.quantity) || 0) * (parseFloat(l.unitPrice) || 0) * (1 - (parseFloat(l.discount) || 0) / 100) * gd * (parseFloat(l.vatRate) || 0) / 100, 0)

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-5">Informations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Client <span className="text-red-500">*</span></label>
                <select
                  required
                  value={customerId}
                  onChange={e => setCustomerId(e.target.value)}
                  className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 bg-white"
                >
                  <option value="">Sélectionner un client</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.companyName}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-[#111827]">Produits livrés</h3>
              <button
                type="button"
                onClick={addLine}
                className="flex items-center gap-1.5 h-9 px-3 border border-[#166534] text-[#166534] text-sm font-semibold rounded-lg hover:bg-[#f0fdf4] transition-colors"
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-[1fr_60px_100px_70px_65px_90px_80px_36px] gap-2">
                <p className="text-xs font-medium text-[#64748b]">Produit</p>
                <p className="text-xs font-medium text-[#64748b]">Qté</p>
                <p className="text-xs font-medium text-[#64748b]">Prix HT (€)</p>
                <p className="text-xs font-medium text-[#64748b]">Remise (%)</p>
                <p className="text-xs font-medium text-[#64748b]">TVA (%)</p>
                <p className="text-xs font-medium text-[#64748b]">Total HT</p>
                <p className="text-xs font-medium text-[#64748b]">Total TVA</p>
                <span />
              </div>
              {lines.map((line, i) => {
                const lineHT = (parseInt(line.quantity) || 0) * (parseFloat(line.unitPrice) || 0) * (1 - (parseFloat(line.discount) || 0) / 100)
                const lineTVA = lineHT * (parseFloat(line.vatRate) || 0) / 100
                return (
                <div key={i} className="grid grid-cols-[1fr_60px_100px_70px_65px_90px_80px_36px] gap-2 items-center">
                  <select
                    required
                    value={line.productId}
                    onChange={e => updateLine(i, "productId", e.target.value)}
                    className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] bg-white"
                  >
                    <option value="">Choisir...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={line.quantity}
                    onChange={e => updateLine(i, "quantity", e.target.value)}
                    className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] text-center"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    required
                    value={line.unitPrice}
                    onChange={e => updateLine(i, "unitPrice", e.target.value)}
                    className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534]"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={line.discount}
                    onChange={e => updateLine(i, "discount", e.target.value)}
                    className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] text-center"
                  />
                  <select
                    required
                    value={line.vatRate}
                    onChange={e => updateLine(i, "vatRate", e.target.value)}
                    className="h-10 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] bg-white text-center"
                  >
                    <option value="5.5">5,5%</option>
                    <option value="20">20%</option>
                  </select>
                  <p className="h-10 flex items-center justify-end text-sm font-medium text-[#111827]">
                    {lineHT.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </p>
                  <p className="h-10 flex items-center justify-end text-sm text-[#64748b]">
                    {lineTVA.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeLine(i)}
                    disabled={lines.length === 1}
                    className="h-10 w-9 flex items-center justify-center text-[#94a3b8] hover:text-[#dc2626] disabled:opacity-30 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Notes</h3>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Notes ou instructions de livraison..."
              className="w-full px-4 py-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Remise globale</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={globalDiscount}
                onChange={e => setGlobalDiscount(e.target.value)}
                className="h-10 w-24 px-3 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] text-center"
              />
              <span className="text-sm text-[#64748b]">% sur le total</span>
            </div>
          </div>
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-4">Récapitulatif</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#64748b]">Total HT</span>
                <span className="font-medium text-[#111827]">
                  {totalHT.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748b]">TVA</span>
                <span className="font-medium text-[#111827]">
                  {totalTVA.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="border-t border-[#e2e8f0] pt-3 flex justify-between">
                <span className="text-sm font-semibold text-[#111827]">Total TTC</span>
                <span className="text-lg font-bold text-[#166534]">
                  {(totalHT + totalTVA).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="h-11 bg-[#166534] hover:bg-[#14532d] disabled:opacity-60 text-white text-sm font-semibold rounded-[10px] transition-colors"
          >
            {isPending ? "Création..." : "Créer le bon de livraison"}
          </button>
          <Link
            href="/bons-de-livraison"
            className="h-11 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors"
          >
            Annuler
          </Link>
        </div>
      </div>
    </form>
  )
}
