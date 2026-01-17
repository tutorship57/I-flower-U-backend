-- CreateTable
CREATE TABLE "ProductSet" (
    "set_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSet_pkey" PRIMARY KEY ("set_id","item_id")
);

-- AddForeignKey
ALTER TABLE "ProductSet" ADD CONSTRAINT "ProductSet_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSet" ADD CONSTRAINT "ProductSet_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
