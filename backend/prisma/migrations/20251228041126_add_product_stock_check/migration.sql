-- This is an empty migration.

ALTER TABLE "Product"
ADD CONSTRAINT product_stock_non_negative
CHECK ("product_stock" >= 0);
