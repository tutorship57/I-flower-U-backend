import { read, readFileSync } from 'node:fs';
import prisma from '../../../shared/prisma/prismaClient';


const checkoutRepository = {
    getCartAggregatedItems: async (cart_id:string) =>{
        const sqlNormalizedCart = readFileSync('src/modules/checkout/repository/sql/cart-aggregated-items.raw.sql', 'utf-8');

        const aggregatedItems = await prisma.$queryRawUnsafe<Array<{product_id:string; quantity:number}>>
        (sqlNormalizedCart, cart_id);
        return aggregatedItems;
    },
    getOrderAggregatedItems: async (order_id:string) =>{
        const sqlNormalizedOrder = readFileSync('src/modules/checkout/repository/sql/order-aggregated-items.raw.sql', 'utf-8');

        const aggregatedItems = await prisma.$queryRawUnsafe<Array<{product_id:string; quantity:number}>>
        (sqlNormalizedOrder, order_id);
        return aggregatedItems;
    }
}
export default checkoutRepository;