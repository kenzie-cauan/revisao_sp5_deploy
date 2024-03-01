-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "number" INTEGER,
    "address_info" TEXT,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(20) NOT NULL,
    "country" VARCHAR(255) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);
