import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { checkoutService } from "../service/checkout.service";


const checkoutController =  asyncHandler(async (req, res, next) => {
    // #swagger.tags = ['Checkout']
    const {user_id, cart_id} = req.body;
    const order = await checkoutService({user_id, cart_id});
    res.status(200).json({
        data: order,
    });
});
export {checkoutController};