"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function generateBLNumber(): Promise<string> {
  const last = await prisma.deliveryNote.findFirst({ orderBy: { number: "desc" } })
  let seq = 1
  if (last) {
    const match = last.number.match(/-(\d{4})$/)
    if (match) seq = parseInt(match[1]) + 1
  }
  const num = String(seq).padStart(4, "0")
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `BL-${year}${month}-${num}`
}

export async function createDeliveryNote(data: {
  customerId: string
  date: string
  notes: string
  globalDiscount: number
  lines: { productId: string; quantity: number; unitPrice: number; vatRate: number; discount: number }[]
}) {
  const { customerId, date, notes, globalDiscount, lines } = data

  if (!customerId) throw new Error("Client obligatoire")
  if (lines.length === 0 || lines.some(l => !l.productId)) throw new Error("Toutes les lignes doivent avoir un produit")

  const number = await generateBLNumber()
  const activeCompany = await prisma.companySettings.findFirst({ where: { isActive: true } })

  const deliveryNote = await prisma.deliveryNote.create({
    data: {
      number,
      date: date ? new Date(date) : new Date(),
      customerId,
      notes: notes || null,
      globalDiscount,
      companySettingsId: activeCompany?.id ?? null,
      lines: {
        create: lines.map(l => ({
          productId: l.productId,
          quantity: l.quantity,
          unitPrice: l.unitPrice,
          vatRate: l.vatRate,
          discount: l.discount,
        })),
      },
    },
  })

  for (const line of lines) {
    await prisma.product.update({
      where: { id: line.productId },
      data: { stock: { decrement: line.quantity } },
    })
  }

  revalidatePath("/bons-de-livraison")
  revalidatePath("/produits")
  redirect(`/bons-de-livraison/${deliveryNote.id}`)
}

export async function archiveDeliveryNote(id: string, archived: boolean) {
  await prisma.deliveryNote.update({
    where: { id },
    data: { archived },
  })
  revalidatePath(`/bons-de-livraison/${id}`)
  revalidatePath("/bons-de-livraison")
  revalidatePath("/archives")
}

export async function deleteDeliveryNote(id: string) {
  await prisma.deliveryNote.delete({ where: { id } })
  revalidatePath("/archives")
  revalidatePath("/bons-de-livraison")
}

export async function updateDeliveryNoteCompany(id: string, companySettingsId: string | null) {
  await prisma.deliveryNote.update({
    where: { id },
    data: { companySettingsId },
  })
  revalidatePath(`/bons-de-livraison/${id}`)
  revalidatePath("/bons-de-livraison")
}
