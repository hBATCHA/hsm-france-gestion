"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateSettings(formData: FormData) {
  await prisma.companySettings.upsert({
    where: { id: "default" },
    update: {
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
    },
    create: {
      id: "default",
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
    },
  })

  revalidatePath("/parametres")
}
