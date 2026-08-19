import { Document, Page, View, Text, StyleSheet, renderToBuffer } from "@react-pdf/renderer"

const LEGAL =
  "En cas de retard de paiement, des pénalités de retard égales à 3 fois le taux d'intérêt légal seront exigibles (Art. L441-10 du Code de Commerce). Indemnité forfaitaire pour frais de recouvrement en cas de retard : 40 €. Pas d'escompte pour règlement anticipé."

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 40,
    paddingBottom: 100,
    paddingHorizontal: 48,
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  companyName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#166534",
  },
  companySubtitle: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 3,
    letterSpacing: 1,
  },
  invoiceTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#166534",
    textAlign: "right",
  },
  invoiceNumber: {
    fontSize: 11,
    color: "#64748b",
    textAlign: "right",
    marginTop: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginBottom: 20,
  },
  datesRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  dateBlock: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 6,
  },
  dateLabel: {
    fontSize: 8,
    color: "#64748b",
    marginBottom: 3,
  },
  dateValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  infoBlock: {
    width: "46%",
  },
  infoLabel: {
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
  },
  infoValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 3,
  },
  infoText: {
    fontSize: 9,
    color: "#64748b",
    marginBottom: 2,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  colLabel: { flex: 3, fontSize: 9, fontFamily: "Helvetica-Bold", color: "#334155" },
  colQty: { width: 40, textAlign: "right", fontSize: 9, fontFamily: "Helvetica-Bold", color: "#334155" },
  colPrice: { width: 70, textAlign: "right", fontSize: 9, fontFamily: "Helvetica-Bold", color: "#334155" },
  colTva: { width: 40, textAlign: "right", fontSize: 9, fontFamily: "Helvetica-Bold", color: "#334155" },
  colTotal: { width: 70, textAlign: "right", fontSize: 9, fontFamily: "Helvetica-Bold", color: "#334155" },
  cellLabel: { flex: 3, fontSize: 9, color: "#111827" },
  cellQty: { width: 40, textAlign: "right", fontSize: 9, color: "#111827" },
  cellPrice: { width: 70, textAlign: "right", fontSize: 9, color: "#111827" },
  cellTva: { width: 40, textAlign: "right", fontSize: 9, color: "#64748b" },
  cellTotal: { width: 70, textAlign: "right", fontSize: 9, fontFamily: "Helvetica-Bold", color: "#111827" },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  paymentBox: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 6,
  },
  paymentLabel: {
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  paymentRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  paymentKey: { fontSize: 9, color: "#64748b", width: 40 },
  paymentVal: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#111827" },
  totalsBox: {
    width: 200,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalLabel: { fontSize: 9, color: "#64748b" },
  totalValue: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#111827" },
  totalDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginVertical: 4,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0fdf4",
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  grandTotalLabel: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#111827" },
  grandTotalValue: { fontSize: 13, fontFamily: "Helvetica-Bold", color: "#166534" },
  notes: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  notesLabel: { fontSize: 8, color: "#64748b", marginBottom: 3 },
  notesText: { fontSize: 9, color: "#111827" },
  legalBox: {
    position: "absolute",
    bottom: 48,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
  },
  legalText: {
    fontSize: 7,
    color: "#94a3b8",
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 7, color: "#94a3b8" },
})

type CompanyData = {
  name: string
  legalForm: string
  capital: string
  address: string
  siret: string
  vatNumber: string
  rcs: string
  iban: string
  bic: string
  bank: string
  email: string
  phone: string
}

type InvoiceData = {
  number: string
  date: Date | string
  dueDate: Date | string
  status: string
  paidAt?: Date | string | null
  notes?: string | null
  totalHT: number
  totalTVA: number
  totalTTC: number
  customer: {
    companyName: string
    contactName?: string | null
    billingAddress?: string | null
    siret?: string | null
    vatNumber?: string | null
  }
  lines: {
    label: string
    quantity: number
    unitPrice: number
    vatRate: number
  }[]
  deliveryNote?: { number: string } | null
  payments?: { amount: number; date: Date | string; method: string; note?: string | null }[]
}

function fmt(n: number) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

function InvoicePDF({ facture, company }: { facture: InvoiceData; company: CompanyData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.companySubtitle}>IMPORT · DISTRIBUER · PARTAGER</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>FACTURE</Text>
            <Text style={styles.invoiceNumber}>{facture.number}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Dates */}
        <View style={styles.datesRow}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Date d'émission</Text>
            <Text style={styles.dateValue}>{fmtDate(facture.date)}</Text>
          </View>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Date d'échéance</Text>
            <Text style={styles.dateValue}>{fmtDate(facture.dueDate)}</Text>
          </View>
          {facture.deliveryNote && (
            <View style={styles.dateBlock}>
              <Text style={styles.dateLabel}>Bon de livraison</Text>
              <Text style={styles.dateValue}>{facture.deliveryNote.number}</Text>
            </View>
          )}
        </View>

        {/* Émetteur / Destinataire */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Émetteur</Text>
            <Text style={styles.infoValue}>{company.legalForm} {company.name}</Text>
            <Text style={styles.infoText}>{company.address}</Text>
            {company.siret && <Text style={styles.infoText}>SIRET : {company.siret}</Text>}
            {company.vatNumber && <Text style={styles.infoText}>TVA : {company.vatNumber}</Text>}
            {company.rcs && <Text style={styles.infoText}>{company.rcs}</Text>}
            {company.capital && <Text style={styles.infoText}>Capital : {company.capital}</Text>}
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Destinataire</Text>
            <Text style={styles.infoValue}>{facture.customer.companyName}</Text>
            {facture.customer.contactName && (
              <Text style={styles.infoText}>{facture.customer.contactName}</Text>
            )}
            {facture.customer.billingAddress && (
              <Text style={styles.infoText}>{facture.customer.billingAddress}</Text>
            )}
            {facture.customer.siret && (
              <Text style={styles.infoText}>SIRET : {facture.customer.siret}</Text>
            )}
            {facture.customer.vatNumber && (
              <Text style={styles.infoText}>TVA : {facture.customer.vatNumber}</Text>
            )}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colLabel}>Désignation</Text>
            <Text style={styles.colQty}>Qté</Text>
            <Text style={styles.colPrice}>Prix HT</Text>
            <Text style={styles.colTva}>TVA</Text>
            <Text style={styles.colTotal}>Total HT</Text>
          </View>
          {facture.lines.map((line, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.cellLabel}>{line.label}</Text>
              <Text style={styles.cellQty}>{line.quantity}</Text>
              <Text style={styles.cellPrice}>{fmt(line.unitPrice)}</Text>
              <Text style={styles.cellTva}>{line.vatRate} %</Text>
              <Text style={styles.cellTotal}>{fmt(line.quantity * line.unitPrice)}</Text>
            </View>
          ))}
        </View>

        {/* Paiement + Totaux */}
        <View style={styles.bottomRow}>
          <View style={styles.paymentBox}>
            <Text style={styles.paymentLabel}>Modalités de paiement</Text>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentKey}>IBAN</Text>
              <Text style={styles.paymentVal}>{company.iban}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentKey}>BIC</Text>
              <Text style={styles.paymentVal}>{company.bic}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentKey}>Banque</Text>
              <Text style={styles.paymentVal}>{company.bank}</Text>
            </View>
          </View>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total HT</Text>
              <Text style={styles.totalValue}>{fmt(facture.totalHT)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TVA</Text>
              <Text style={styles.totalValue}>{fmt(facture.totalTVA)}</Text>
            </View>
            <View style={styles.totalDivider} />
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total TTC</Text>
              <Text style={styles.grandTotalValue}>{fmt(facture.totalTTC)}</Text>
            </View>
          </View>
        </View>

        {/* Historique des paiements */}
        {facture.payments && facture.payments.length > 0 && (() => {
          const totalPaid = facture.payments!.reduce((acc, p) => acc + p.amount, 0)
          const remaining = facture.totalTTC - totalPaid
          return (
            <View style={{ ...styles.notes, marginBottom: 16 }}>
              <Text style={{ ...styles.notesLabel, marginBottom: 6 }}>Historique des paiements</Text>
              {facture.payments!.map((p, i) => (
                <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                  <Text style={{ fontSize: 9, color: "#64748b" }}>
                    {new Date(p.date).toLocaleDateString("fr-FR")} · {p.method}{p.note ? ` · ${p.note}` : ""}
                  </Text>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#111827" }}>{fmt(p.amount)}</Text>
                </View>
              ))}
              <View style={{ borderTopWidth: 1, borderTopColor: "#e2e8f0", marginTop: 6, paddingTop: 6, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 9, color: "#64748b" }}>Total payé</Text>
                <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#166534" }}>{fmt(totalPaid)}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 3 }}>
                <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#111827" }}>Reste à payer</Text>
                <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", color: remaining > 0 ? "#dc2626" : "#166534" }}>{fmt(remaining)}</Text>
              </View>
            </View>
          )
        })()}

        {/* Notes */}
        {facture.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{facture.notes}</Text>
          </View>
        )}

        {/* Mentions légales + footer */}
        <View style={styles.legalBox} fixed>
          <Text style={styles.legalText}>{LEGAL}</Text>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{company.legalForm} {company.name} — Capital {company.capital} — {company.rcs} — TVA {company.vatNumber}</Text>
            <Text style={styles.footerText}>{facture.number}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function generateInvoicePDF(facture: InvoiceData, company: CompanyData): Promise<Buffer> {
  return renderToBuffer(<InvoicePDF facture={facture} company={company} />) as Promise<Buffer>
}
