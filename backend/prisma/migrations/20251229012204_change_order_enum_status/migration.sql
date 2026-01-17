/*
  Warnings:

  - The values [PENDING,PROCESSING,SHIPPED,DELIVERED,CANCELLED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('CREATE', 'RESERVE', 'WAITING_PAYMENT', 'PAID', 'EXPIRED', 'CANCEL', 'REFUND');
ALTER TABLE "public"."Order" ALTER COLUMN "order_status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "order_status" TYPE "OrderStatus_new" USING ("order_status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "order_status" SET DEFAULT 'CREATE';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "order_status" SET DEFAULT 'CREATE';
