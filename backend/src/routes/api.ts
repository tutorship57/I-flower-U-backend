import { Router } from 'express';
import recommendationRouter from "../modules/recommendation/route/recommendation.route"
// import userRouter from '../modules/user/routes/user.route'
import roleRouter from '../modules/user/routes/role.route';
import authRouter from '../modules/auth/routes/auth.route';
import cartrRouter from '../modules/cart/routes/cart.route';
import cartItemRouter from '../modules/cart/routes/cartItem.route';
import checkoutRouter from '../modules/checkout/routes/checkout.route';
import productRouter from '../modules/product/routes/product.route';
import categoryRouter from '../modules/product/routes/category.route';
import colorRouter from '../modules/product/routes/colorType.route';
import flowerTypeRouter from '../modules/product/routes/flowerType.route';
import orderRouter from '../modules/order/routes/order.route';
import userRouter from '../modules/user/routes/user.route';
import shopRouter from '../modules/shop/routes/shop.route';
import tagEventRouter from '../modules/product/routes/productTagEvent.route';
//order route เหลือ
const router = Router();

// user routes
router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter); // Order routes to be added here
router.use('/cart', cartrRouter);
router.use('/cart-item', cartItemRouter);
router.use('/checkout', checkoutRouter);
router.use('/user', userRouter); // User routes to be added here
router.use('/recommendation', recommendationRouter);
// admin routes
router.use('/category', categoryRouter);
router.use('/color', colorRouter);
router.use('/flower-type', flowerTypeRouter);
router.use('/role', roleRouter);
router.use('/tag-event', tagEventRouter);
//shop routes
router.use('/shop', shopRouter); // Shop routes to be added here
//health check route
router.use('/health', (req, res) => {
    res.status(200).send('API is healthy');
});

export default router;