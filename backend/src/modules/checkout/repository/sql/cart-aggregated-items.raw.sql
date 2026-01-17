SELECT 
    x.product_id,
    SUM(x.total_qty) AS quantity
FROM (
    SELECT
        ci.product_id,
        ci.quantity AS total_qty
    FROM CartItem ci
    WHERE ci.cart_id = ?

    UNION ALL

    SELECT
        ps.item_id AS product_id,
        (ci.quantity * ps.quantity) AS total_qty
    FROM CartItem ci
    JOIN ProductSet ps
        ON ci.product_id = ps.set_id
    WHERE ci.cart_id = ?
) x
GROUP BY x.product_id
ORDER BY x.product_id ASC;