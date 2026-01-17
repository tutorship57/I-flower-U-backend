import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { checkoutService } from "../service/checkout.service";


const checkoutController =  asyncHandler(async (req, res, next) => {
    const {user_id, total_amount, items, cart_id} = req.body;
    const order_id = await checkoutService({user_id, total_amount, items, cart_id});
    res.status(200).json({
        data: order_id,
    });
});
export {checkoutController};