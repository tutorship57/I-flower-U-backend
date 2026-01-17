SELECT 
   x.product_id,
   SUM(x.quantity) AS total_qty
FROM (
    -- normal item
    SELECT 
       oi.product_id,
       oi.quantity
    FROM OrderItem oi
    WHERE oi.order_id = ?

    UNION ALL

    -- expanded from set
    SELECT 
       ps.item_id,
       (oi.quantity * ps.quantity)
    FROM OrderItem oi
    JOIN ProductSet ps 
       ON oi.product_id = ps.set_id
    WHERE oi.order_id = ?
) x
GROUP BY x.product_id
ORDER BY x.product_id ASC;
