"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function generateBLNumber(): Promise<string> {
  const count = await prisma.deliveryNote.count()
  const num = String(count + 1).padStart(4, "0")
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  return `BL-${year}${month}-${num}`
}

export async function createDeliveryNote(data: {
  customerId: string
  date: string
  notes: string
  lines: { productId: string; quantity: number; unitPrice: number; vatRate: number }[]
}) {
  const { customerId, date, notes, lines } = data

  if (!customerId) throw new Error("Client obligatoire")
  if (lines.length === 0 || lines.some(l => !l.productId)) throw new Error("Toutes les lignes doivent avoir un produit")

  const number = await generateBLNumber()

  const deliveryNote = await prisma.deliveryNote.create({
    data: {
      number,
      date: date ? new Date(date) : new Date(),
      customerId,
      notes: notes || null,
      lines: {
        create: lines.map(l => ({
          productId: l.productId,
          quantity: l.quantity,
          unitPrice: l.unitPrice,
          vatRate: l.vatRate,
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
