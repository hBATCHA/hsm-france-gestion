-- AlterTable
ALTER TABLE "DeliveryNote" ADD COLUMN     "globalDiscount" DECIMAL(5,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "DeliveryNoteLine" ADD COLUMN     "discount" DECIMAL(5,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "globalDiscount" DECIMAL(5,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "InvoiceLine" ADD COLUMN     "discount" DECIMAL(5,2) NOT NULL DEFAULT 0;
