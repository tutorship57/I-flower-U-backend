interface productStockInterface {
    product_id: string;
    stock_qty: number;
}

interface productStockRequestInterface {
    stock_qty: number;
}

interface createProductStockInterface extends productStockInterface {
}

interface updateProductStockInterface {
    product_id?: string;
    qty?: number;
}

export {productStockRequestInterface, productStockInterface, createProductStockInterface, updateProductStockInterface };

