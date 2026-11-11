"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

function extractCompanyData(formData: FormData) {
  return {
    name: formData.get("name") as string,
    legalForm: formData.get("legalForm") as string,
    capital: formData.get("capital") as string,
    address: formData.get("address") as string,
    siret: formData.get("siret") as string,
    vatNumber: formData.get("vatNumber") as string,
    rcs: formData.get("rcs") as string,
    iban: formData.get("iban") as string,
    bic: formData.get("bic") as string,
    bank: formData.get("bank") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  }
}

export async function updateCompany(id: string, formData: FormData) {
  await prisma.companySettings.update({
    where: { id },
    data: extractCompanyData(formData),
  })
  revalidatePath("/parametres")
}

export async function addCompany(formData: FormData) {
  await prisma.companySettings.create({
    data: { ...extractCompanyData(formData), isActive: false },
  })
  revalidatePath("/parametres")
}

export async function setActiveCompany(id: string) {
  await prisma.$transaction([
    prisma.companySettings.updateMany({ data: { isActive: false } }),
    prisma.companySettings.update({ where: { id }, data: { isActive: true } }),
  ])
  revalidatePath("/parametres")
}

export async function deleteCompany(id: string) {
  const [company, total] = await Promise.all([
    prisma.companySettings.findUnique({ where: { id } }),
    prisma.companySettings.count(),
  ])
  if (!company || company.isActive || total <= 1) return
  await prisma.companySettings.delete({ where: { id } })
  revalidatePath("/parametres")
}
