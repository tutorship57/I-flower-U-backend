import { Router } from 'express';
import recommendationRouter from "../modules/recommendation/route/recommendation.route"
import roleRouter from '../modules/user/routes/role.route';
import authRouter from '../modules/auth/routes/auth.route';
import cartRouter from '../modules/cart/routes/cart.route';
import checkoutRouter from '../modules/checkout/routes/checkout.route';
import productRouter from '../modules/product/routes/product.route';
import categoryRouter from '../modules/product/routes/category.route';
import colorRouter from '../modules/product/routes/colorType.route';
import flowerTypeRouter from '../modules/product/routes/flowerType.route';
import orderRouter from '../modules/order/routes/order.route';
import userRouter from '../modules/user/routes/user.route';
import shopRouter from '../modules/shop/routes/shop.route';
import tagEventRouter from '../modules/product/routes/tagEvent.route';
import stockRouter from '../modules/stock/routes/product-stock.route';
import paymentTypeRouter from '../modules/payment/routes/paymentType.route'
import paymentRouter from '../modules/payment/routes/payment.route'
//order route เหลือ
const router = Router();

// user routes
router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use('/cart', cartRouter);
router.use('/stock', stockRouter);
router.use('/checkout', checkoutRouter);
router.use('/recommendation', recommendationRouter);
router.use('/user', userRouter); 
router.use('/payment',paymentRouter)
// admin routes
router.use('/category', categoryRouter);
router.use('/color', colorRouter);
router.use('/flower-type', flowerTypeRouter);
router.use('/role', roleRouter);
router.use('/tag-event', tagEventRouter);
router.use('/payment-type',paymentTypeRouter)
//shop routes
router.use('/shop', shopRouter); // Shop routes to be added here
//health check route
router.use('/health', (req, res) => {
    console.log('this is session:', req.session);
    res.status(200).send('API is healthy');
});

export default router;