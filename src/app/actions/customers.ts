"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createCustomer(formData: FormData) {
  const companyName = formData.get("companyName") as string
  const contactName = formData.get("contactName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const siret = formData.get("siret") as string
  const vatNumber = formData.get("vatNumber") as string
  const billingAddress = formData.get("billingAddress") as string
  const deliveryAddress = formData.get("deliveryAddress") as string
  const paymentDelay = parseInt(formData.get("paymentDelay") as string) || 30
  const notes = formData.get("notes") as string

  if (!companyName) throw new Error("La raison sociale est obligatoire")

  await prisma.customer.create({
    data: {
      companyName,
      contactName: contactName || null,
      email: email || null,
      phone: phone || null,
      siret: siret || null,
      vatNumber: vatNumber || null,
      billingAddress: billingAddress || null,
      deliveryAddress: deliveryAddress || null,
      paymentDelay,
      notes: notes || null,
    },
  })

  revalidatePath("/clients")
  redirect("/clients")
}

export async function updateCustomer(id: string, formData: FormData) {
  const companyName = formData.get("companyName") as string
  const contactName = formData.get("contactName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const siret = formData.get("siret") as string
  const vatNumber = formData.get("vatNumber") as string
  const billingAddress = formData.get("billingAddress") as string
  const deliveryAddress = formData.get("deliveryAddress") as string
  const paymentDelay = parseInt(formData.get("paymentDelay") as string) || 30
  const notes = formData.get("notes") as string

  if (!companyName) throw new Error("La raison sociale est obligatoire")

  await prisma.customer.update({
    where: { id },
    data: {
      companyName,
      contactName: contactName || null,
      email: email || null,
      phone: phone || null,
      siret: siret || null,
      vatNumber: vatNumber || null,
      billingAddress: billingAddress || null,
      deliveryAddress: deliveryAddress || null,
      paymentDelay,
      notes: notes || null,
    },
  })

  revalidatePath("/clients")
  revalidatePath(`/clients/${id}`)
  redirect(`/clients/${id}`)
}

export async function archiveCustomer(id: string) {
  await prisma.customer.update({
    where: { id },
    data: { archived: true },
  })

  revalidatePath("/clients")
  redirect("/clients")
}

export async function unarchiveCustomer(id: string) {
  await prisma.customer.update({
    where: { id },
    data: { archived: false },
  })

  revalidatePath("/archives")
  revalidatePath("/clients")
}
