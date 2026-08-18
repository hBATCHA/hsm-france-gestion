"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function syncInvoiceStatus(invoiceId: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { payments: true },
  })
  if (!invoice) return

  const totalPaid = invoice.payments.reduce((acc, p) => acc + Number(p.amount), 0)
  if (totalPaid >= Number(invoice.totalTTC)) {
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "payée", paidAt: new Date() },
    })
  } else {
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "en attente", paidAt: null },
    })
  }
}

export async function addPayment(invoiceId: string, formData: FormData) {
  const amount = parseFloat(formData.get("amount") as string)
  const date = formData.get("date") as string
  const method = formData.get("method") as string
  const note = formData.get("note") as string

  if (!amount || amount <= 0) throw new Error("Montant invalide")

  await prisma.payment.create({
    data: {
      invoiceId,
      amount,
      date: date ? new Date(date) : new Date(),
      method,
      note: note || null,
    },
  })

  await syncInvoiceStatus(invoiceId)
  revalidatePath(`/factures/${invoiceId}`)
  revalidatePath("/factures")
}

export async function updatePayment(paymentId: string, invoiceId: string, formData: FormData) {
  const amount = parseFloat(formData.get("amount") as string)
  const date = formData.get("date") as string
  const method = formData.get("method") as string
  const note = formData.get("note") as string

  if (!amount || amount <= 0) throw new Error("Montant invalide")

  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      amount,
      date: date ? new Date(date) : new Date(),
      method,
      note: note || null,
    },
  })

  await syncInvoiceStatus(invoiceId)
  revalidatePath(`/factures/${invoiceId}`)
  revalidatePath("/factures")
}

export async function deletePayment(paymentId: string, invoiceId: string) {
  await prisma.payment.delete({ where: { id: paymentId } })
  await syncInvoiceStatus(invoiceId)
  revalidatePath(`/factures/${invoiceId}`)
  revalidatePath("/factures")
}
