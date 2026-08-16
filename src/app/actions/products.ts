"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function parseDecimal(value: FormDataEntryValue | null): number {
  return parseFloat((value as string)?.replace(",", ".")) || 0
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  if (!name) throw new Error("Le nom du produit est obligatoire")

  await prisma.product.create({
    data: {
      name,
      reference: (formData.get("reference") as string) || null,
      category: (formData.get("category") as string) || null,
      brand: (formData.get("brand") as string) || null,
      variety: (formData.get("variety") as string) || null,
      packaging: (formData.get("packaging") as string) || null,
      purchasePrice: parseDecimal(formData.get("purchasePrice")),
      sellingPrice: parseDecimal(formData.get("sellingPrice")),
      vatRate: parseDecimal(formData.get("vatRate")) || 5.5,
      stock: parseInt(formData.get("stock") as string) || 0,
      alertThreshold: parseInt(formData.get("alertThreshold") as string) || 0,
    },
  })

  revalidatePath("/produits")
  redirect("/produits")
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string
  if (!name) throw new Error("Le nom du produit est obligatoire")

  await prisma.product.update({
    where: { id },
    data: {
      name,
      reference: (formData.get("reference") as string) || null,
      category: (formData.get("category") as string) || null,
      brand: (formData.get("brand") as string) || null,
      variety: (formData.get("variety") as string) || null,
      packaging: (formData.get("packaging") as string) || null,
      purchasePrice: parseDecimal(formData.get("purchasePrice")),
      sellingPrice: parseDecimal(formData.get("sellingPrice")),
      vatRate: parseDecimal(formData.get("vatRate")) || 5.5,
      stock: parseInt(formData.get("stock") as string) || 0,
      alertThreshold: parseInt(formData.get("alertThreshold") as string) || 0,
    },
  })

  revalidatePath("/produits")
  revalidatePath(`/produits/${id}`)
  redirect(`/produits/${id}`)
}

export async function archiveProduct(id: string) {
  await prisma.product.update({
    where: { id },
    data: { archived: true },
  })

  revalidatePath("/produits")
  redirect("/produits")
}
