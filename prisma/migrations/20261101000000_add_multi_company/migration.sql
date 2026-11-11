ALTER TABLE "CompanySettings" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT false;
UPDATE "CompanySettings" SET "isActive" = true WHERE id = 'default';
