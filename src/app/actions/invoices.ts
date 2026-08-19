"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createInvoiceFromDeliveryNote(deliveryNoteId: string) {
  const bl = await prisma.deliveryNote.findUnique({
    where: { id: deliveryNoteId },
    include: { customer: true, lines: { include: { product: true } } },
  })

  if (!bl) throw new Error("Bon de livraison introuvable")
  if (bl.invoiced) throw new Error("Ce bon de livraison est déjà facturé")

  const totalHT = bl.lines.reduce((acc, l) => acc + l.quantity * Number(l.unitPrice), 0)
  const totalTVA = bl.lines.reduce((acc, l) => acc + l.quantity * Number(l.unitPrice) * Number(l.vatRate) / 100, 0)
  const totalTTC = totalHT + totalTVA

  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + bl.customer.paymentDelay)

  const number = bl.number.replace(/^BL/, "FA")

  const invoice = await prisma.invoice.create({
    data: {
      number,
      dueDate,
      customerId: bl.customerId,
      deliveryNoteId: bl.id,
      totalHT,
      totalTVA,
      totalTTC,
      lines: {
        create: bl.lines.map(l => ({
          productId: l.productId,
          label: l.product.name,
          quantity: l.quantity,
          unitPrice: l.unitPrice,
          vatRate: l.vatRate,
        })),
      },
    },
  })

  await prisma.deliveryNote.update({
    where: { id: deliveryNoteId },
    data: { invoiced: true },
  })

  revalidatePath("/bons-de-livraison")
  revalidatePath(`/bons-de-livraison/${deliveryNoteId}`)
  revalidatePath("/factures")
  redirect(`/factures/${invoice.id}`)
}

export async function markAsPaid(id: string) {
  await prisma.invoice.update({
    where: { id },
    data: { status: "payée", paidAt: new Date() },
  })
  revalidatePath("/factures")
  revalidatePath(`/factures/${id}`)
}
