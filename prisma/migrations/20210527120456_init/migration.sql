-- CreateTable
CREATE TABLE "Quotes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quote" VARCHAR(255) NOT NULL,
    "person" TEXT,
    "year" INTEGER,

    PRIMARY KEY ("id")
);
