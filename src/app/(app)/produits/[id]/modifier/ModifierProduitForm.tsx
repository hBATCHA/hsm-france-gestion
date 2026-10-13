"use client"

import { useTransition } from "react"
import { updateProduct } from "@/app/actions/products"
import { toast } from "sonner"
import Link from "next/link"
import { Decimal } from "@prisma/client/runtime/library"

type Produit = {
  id: string
  name: string
  reference: string | null
  category: string | null
  brand: string | null
  variety: string | null
  packaging: string | null
  purchasePrice: Decimal
  sellingPrice: Decimal
  vatRate: Decimal
  stock: number
  alertThreshold: number
}

export default function ModifierProduitForm({ produit }: { produit: Produit }) {
  const [isPending, startTransition] = useTransition()
  const update = updateProduct.bind(null, produit.id)

  function handleSubmit(formData: FormData) {
    toast.success("Produit modifié !")
    startTransition(() => update(formData))
  }

  return (
    <form action={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-5">Informations produit</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-semibold text-[#111827]">Nom <span className="text-red-500">*</span></label>
                <input name="name" type="text" required defaultValue={produit.name} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Référence</label>
                <input name="reference" type="text" defaultValue={produit.reference ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Catégorie</label>
                <input name="category" type="text" defaultValue={produit.category ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Marque</label>
                <input name="brand" type="text" defaultValue={produit.brand ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Variété</label>
                <input name="variety" type="text" defaultValue={produit.variety ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Conditionnement</label>
                <input name="packaging" type="text" defaultValue={produit.packaging ?? ""} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-[#111827] mb-5">Tarification</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Prix d'achat (€ HT)</label>
                <input name="purchasePrice" type="text" inputMode="decimal" defaultValue={Number(produit.purchasePrice)} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Prix de vente (€ HT)</label>
                <input name="sellingPrice" type="text" inputMode="decimal" defaultValue={Number(produit.sellingPrice)} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">TVA (%)</label>
                <select name="vatRate" defaultValue={String(Number(produit.vatRate))} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10 bg-white">
                  <option value="5.5">5,5%</option>
                  <option value="20">20%</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Seuil d'alerte</label>
                <input name="alertThreshold" type="text" inputMode="numeric" defaultValue={produit.alertThreshold} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#111827]">Stock</label>
                <input name="stock" type="text" inputMode="numeric" defaultValue={produit.stock} className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-[14px] p-6 mb-1">
            <p className="text-xs text-[#64748b]">Stock actuel</p>
            <p className="text-2xl font-bold text-[#166534]">{produit.stock}</p>
          </div>
          <button type="submit" disabled={isPending} className="h-11 bg-[#166534] hover:bg-[#14532d] disabled:opacity-60 text-white text-sm font-semibold rounded-[10px] transition-colors">
            {isPending ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
          <Link href={`/produits/${produit.id}`} className="h-11 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors">
            Annuler
          </Link>
        </div>
      </div>
    </form>
  )
}
