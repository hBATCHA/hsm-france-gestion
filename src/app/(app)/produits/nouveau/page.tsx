import { createProduct } from "@/app/actions/products"
import Link from "next/link"

export default function NouveauProduitPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827]">Nouveau produit</h2>
          <p className="text-sm text-[#64748b] mt-1">Remplissez les informations du produit</p>
        </div>
      </div>

      <form action={createProduct}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Informations produit */}
            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-5">Informations produit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-sm font-semibold text-[#111827]">Nom <span className="text-red-500">*</span></label>
                  <input name="name" type="text" required placeholder="Riz jasmin 20 kg" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Référence</label>
                  <input name="reference" type="text" placeholder="RIZ-JASMIN-20" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Catégorie</label>
                  <input name="category" type="text" placeholder="Riz" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Marque</label>
                  <input name="brand" type="text" placeholder="Marque" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Variété</label>
                  <input name="variety" type="text" placeholder="Jasmin" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Conditionnement</label>
                  <input name="packaging" type="text" placeholder="Sac 20 kg" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
              </div>
            </div>

            {/* Tarification et stock */}
            <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[#111827] mb-5">Tarification et stock</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Prix d'achat (€ HT)</label>
                  <input name="purchasePrice" type="number" step="0.01" min="0" defaultValue="0" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Prix de vente (€ HT)</label>
                  <input name="sellingPrice" type="number" step="0.01" min="0" defaultValue="0" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">TVA (%)</label>
                  <input name="vatRate" type="number" step="0.1" min="0" defaultValue="5.5" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Stock initial</label>
                  <input name="stock" type="number" min="0" defaultValue="0" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#111827]">Seuil d'alerte</label>
                  <input name="alertThreshold" type="number" min="0" defaultValue="0" className="h-12 px-4 border border-[#cbd5e1] rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-[14px] p-6">
              <h3 className="text-base font-semibold text-[#111827] mb-3">Statut</h3>
              <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">Actif</span>
              <p className="text-xs text-[#64748b] mt-3">Le produit sera actif dès sa création.</p>
            </div>
            <div className="flex flex-col gap-3">
              <button type="submit" className="h-11 bg-[#166534] hover:bg-[#14532d] text-white text-sm font-semibold rounded-[10px] transition-colors">
                Enregistrer le produit
              </button>
              <Link href="/produits" className="h-11 flex items-center justify-center border border-[#e2e8f0] text-sm font-medium text-[#64748b] rounded-[10px] hover:bg-[#f8fafc] transition-colors">
                Annuler
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
