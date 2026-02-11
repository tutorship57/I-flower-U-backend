/*
  Warnings:

  - You are about to drop the column `product_stock` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "reserved_status" AS ENUM ('ACTIVE', 'COMPLETED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('ADD', 'REMOVE');

-- CreateEnum
CREATE TYPE "StockReason" AS ENUM ('ORDER', 'RESTOCK', 'CANCEL', 'RETURN', 'ADJUSTMENT', 'DAMAGED');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_stock",
ADD COLUMN     "type_id" INTEGER;

-- CreateTable
CREATE TABLE "ProductStock" (
    "stock_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "stock_qty" INTEGER NOT NULL,
    "reserved_qty" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStock_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "ReservationStock" (
    "reservation_id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,
    "reserved_qty" INTEGER NOT NULL,
    "reserved_status" "reserved_status" NOT NULL DEFAULT 'ACTIVE',
    "order_id" TEXT NOT NULL,
    "expiry_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReservationStock_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "TransactionStock" (
    "transaction_id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,
    "change_qty" INTEGER NOT NULL,
    "reason" "StockReason",
    "transaction_type" "TransactionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionStock_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateIndex
CREATE INDEX "ProductStock_product_id_idx" ON "ProductStock"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_product_id_stock_id_key" ON "ProductStock"("product_id", "stock_id");

-- CreateIndex
CREATE INDEX "ReservationStock_order_id_idx" ON "ReservationStock"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_order_id_key" ON "Payment"("order_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "FlowerType"("type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationStock" ADD CONSTRAINT "ReservationStock_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationStock" ADD CONSTRAINT "ReservationStock_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "ProductStock"("stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionStock" ADD CONSTRAINT "TransactionStock_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "ProductStock"("stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;
