/*
  Warnings:

  - You are about to alter the column `person` on the `Quotes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Quotes" ALTER COLUMN "quote" SET DATA TYPE TEXT,
ALTER COLUMN "person" SET DATA TYPE VARCHAR(255);
