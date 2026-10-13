import { Document, Page, View, Text, StyleSheet, renderToBuffer } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 40,
    paddingBottom: 80,
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
  docTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#166534",
    textAlign: "right",
  },
  docNumber: {
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
  totalsBox: {
    alignSelf: "flex-end",
    width: 200,
    marginBottom: 16,
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
    bottom: 40,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
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
  email: string
  phone: string
}

type DeliveryNoteData = {
  number: string
  date: Date | string
  notes?: string | null
  totalHT: number
  totalTVA: number
  totalTTC: number
  globalDiscount?: number
  customer: {
    companyName: string
    contactName?: string | null
    deliveryAddress?: string | null
    billingAddress?: string | null
    siret?: string | null
    vatNumber?: string | null
  }
  lines: {
    label: string
    quantity: number
    unitPrice: number
    vatRate: number
    discount: number
  }[]
}

function fmt(n: number) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace(/\u202f/g, " ")
    .replace(/\u00a0/g, " ") + " €"
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
}

function DeliveryNotePDF({ bl, company }: { bl: DeliveryNoteData; company: CompanyData }) {
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
            <Text style={styles.docTitle}>BON DE LIVRAISON</Text>
            <Text style={styles.docNumber}>{bl.number}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Date */}
        <View style={styles.datesRow}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Date de livraison</Text>
            <Text style={styles.dateValue}>{fmtDate(bl.date)}</Text>
          </View>
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
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Destinataire</Text>
            <Text style={styles.infoValue}>{bl.customer.companyName}</Text>
            {bl.customer.contactName && (
              <Text style={styles.infoText}>{bl.customer.contactName}</Text>
            )}
            {(bl.customer.deliveryAddress || bl.customer.billingAddress) && (
              <Text style={styles.infoText}>{bl.customer.deliveryAddress ?? bl.customer.billingAddress}</Text>
            )}
            {bl.customer.siret && (
              <Text style={styles.infoText}>SIRET : {bl.customer.siret}</Text>
            )}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colLabel}>Désignation</Text>
            <Text style={styles.colQty}>Qté</Text>
            <Text style={styles.colPrice}>Prix HT</Text>
            <Text style={styles.colTva}>Remise</Text>
            <Text style={styles.colTva}>TVA</Text>
            <Text style={styles.colTotal}>Total HT</Text>
          </View>
          {bl.lines.map((line, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.cellLabel}>{line.label}</Text>
              <Text style={styles.cellQty}>{line.quantity}</Text>
              <Text style={styles.cellPrice}>{fmt(line.unitPrice)}</Text>
              <Text style={styles.cellTva}>{line.discount > 0 ? `${line.discount} %` : "—"}</Text>
              <Text style={styles.cellTva}>{line.vatRate} %</Text>
              <Text style={styles.cellTotal}>{fmt(line.quantity * line.unitPrice * (1 - line.discount / 100))}</Text>
            </View>
          ))}
        </View>

        {/* Totaux */}
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total HT</Text>
            <Text style={styles.totalValue}>{fmt(bl.totalHT)}</Text>
          </View>
          {bl.globalDiscount && bl.globalDiscount > 0 ? (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Remise globale ({bl.globalDiscount} %)</Text>
              <Text style={[styles.totalValue, { color: "#dc2626" }]}>-{fmt(bl.totalHT / (1 - bl.globalDiscount / 100) * (bl.globalDiscount / 100))}</Text>
            </View>
          ) : null}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TVA</Text>
            <Text style={styles.totalValue}>{fmt(bl.totalTVA)}</Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total TTC</Text>
            <Text style={styles.grandTotalValue}>{fmt(bl.totalTTC)}</Text>
          </View>
        </View>

        {/* Notes */}
        {bl.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{bl.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.legalBox} fixed>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>{company.legalForm} {company.name} — {company.rcs} — TVA {company.vatNumber}</Text>
            <Text style={styles.footerText}>{bl.number}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function generateDeliveryNotePDF(bl: DeliveryNoteData, company: CompanyData): Promise<Buffer> {
  return renderToBuffer(<DeliveryNotePDF bl={bl} company={company} />) as Promise<Buffer>
}
