import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateDeliveryNotePDF } from "@/components/pdf/DeliveryNotePDF"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [bl, settings] = await Promise.all([
    prisma.deliveryNote.findUnique({
      where: { id },
      include: { customer: true, lines: { include: { product: true } } },
    }),
    prisma.companySettings.findUnique({ where: { id: "default" } }),
  ])

  if (!bl) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const gd = 1 - Number(bl.globalDiscount) / 100
  const totalHT = bl.lines.reduce((acc, l) => acc + l.quantity * Number(l.unitPrice) * (1 - Number(l.discount) / 100) * gd, 0)
  const totalTVA = bl.lines.reduce((acc, l) => acc + l.quantity * Number(l.unitPrice) * (1 - Number(l.discount) / 100) * gd * Number(l.vatRate) / 100, 0)
  const totalTTC = totalHT + totalTVA

  const company = {
    name: settings?.name ?? "",
    legalForm: settings?.legalForm ?? "",
    capital: settings?.capital ?? "",
    address: settings?.address ?? "",
    siret: settings?.siret ?? "",
    vatNumber: settings?.vatNumber ?? "",
    rcs: settings?.rcs ?? "",
    email: settings?.email ?? "",
    phone: settings?.phone ?? "",
  }

  const buffer = await generateDeliveryNotePDF(
    {
      number: bl.number,
      date: bl.date,
      notes: bl.notes,
      totalHT,
      totalTVA,
      totalTTC,
      globalDiscount: Number(bl.globalDiscount),
      customer: bl.customer,
      lines: bl.lines.map(l => ({
        label: l.product.name,
        quantity: l.quantity,
        unitPrice: Number(l.unitPrice),
        vatRate: Number(l.vatRate),
        discount: Number(l.discount),
      })),
    },
    company
  )

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${bl.number}.pdf"`,
    },
  })
}
