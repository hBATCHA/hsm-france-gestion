-- AlterTable
ALTER TABLE "CompanySettings" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "DeliveryNote" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;
