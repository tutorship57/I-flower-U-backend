/*
  Warnings:

  - The primary key for the `ProductTagEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProductTagEvent" DROP CONSTRAINT "ProductTagEvent_pkey",
ALTER COLUMN "tag_id" DROP DEFAULT,
ADD CONSTRAINT "ProductTagEvent_pkey" PRIMARY KEY ("tag_id", "product_id");
DROP SEQUENCE "ProductTagEvent_tag_id_seq";

-- CreateIndex
CREATE INDEX "Cart_user_id_idx" ON "Cart"("user_id");

-- CreateIndex
CREATE INDEX "CartItem_cart_id_idx" ON "CartItem"("cart_id");

-- CreateIndex
CREATE INDEX "Order_user_id_idx" ON "Order"("user_id");

-- CreateIndex
CREATE INDEX "OrderItem_order_id_idx" ON "OrderItem"("order_id");

-- CreateIndex
CREATE INDEX "Payment_order_id_idx" ON "Payment"("order_id");

-- CreateIndex
CREATE INDEX "Product_shop_id_idx" ON "Product"("shop_id");

-- CreateIndex
CREATE INDEX "Product_category_id_idx" ON "Product"("category_id");

-- CreateIndex
CREATE INDEX "Product_product_name_idx" ON "Product"("product_name");

-- CreateIndex
CREATE INDEX "ProductImage_product_id_idx" ON "ProductImage"("product_id");

-- CreateIndex
CREATE INDEX "ProductSet_set_id_idx" ON "ProductSet"("set_id");

-- CreateIndex
CREATE INDEX "ProductSet_item_id_idx" ON "ProductSet"("item_id");

-- CreateIndex
CREATE INDEX "Shop_user_id_idx" ON "Shop"("user_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
