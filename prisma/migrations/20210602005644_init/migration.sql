/*
  Warnings:

  - You are about to drop the `Quotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quotes" DROP CONSTRAINT "Quotes_userId_fkey";

-- DropTable
DROP TABLE "Quotes";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "quotes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quote" TEXT NOT NULL,
    "person" VARCHAR(255) DEFAULT E'Anonymous',
    "year" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apikeys" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "apikey" TEXT NOT NULL,
    "max_limit" INTEGER DEFAULT 25,

    PRIMARY KEY ("id")
);
