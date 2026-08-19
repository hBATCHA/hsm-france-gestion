import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { generateInvoicePDF } from "@/components/pdf/InvoicePDF"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const original = req.nextUrl.searchParams.get("original") === "true"

  const [facture, settings] = await Promise.all([
    prisma.invoice.findUnique({
      where: { id },
      include: { customer: true, lines: true, deliveryNote: true, payments: { orderBy: { date: "asc" } } },
    }),
    prisma.companySettings.findUnique({ where: { id: "default" } }),
  ])

  if (!facture) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const company = {
    name: settings?.name ?? "",
    legalForm: settings?.legalForm ?? "",
    capital: settings?.capital ?? "",
    address: settings?.address ?? "",
    siret: settings?.siret ?? "",
    vatNumber: settings?.vatNumber ?? "",
    rcs: settings?.rcs ?? "",
    iban: settings?.iban ?? "",
    bic: settings?.bic ?? "",
    bank: settings?.bank ?? "",
    email: settings?.email ?? "",
    phone: settings?.phone ?? "",
  }

  const buffer = await generateInvoicePDF(
    {
      number: facture.number,
      date: facture.date,
      dueDate: facture.dueDate,
      status: facture.status,
      paidAt: facture.paidAt,
      notes: facture.notes,
      totalHT: Number(facture.totalHT),
      totalTVA: Number(facture.totalTVA),
      totalTTC: Number(facture.totalTTC),
      customer: facture.customer,
      lines: facture.lines.map(l => ({
        label: l.label,
        quantity: l.quantity,
        unitPrice: Number(l.unitPrice),
        vatRate: Number(l.vatRate),
      })),
      deliveryNote: facture.deliveryNote ? { number: facture.deliveryNote.number } : null,
      payments: original ? [] : facture.payments.map(p => ({
        amount: Number(p.amount),
        date: p.date,
        method: p.method,
        note: p.note,
      })),
    },
    company
  )

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${facture.number}.pdf"`,
    },
  })
}
