import {Router} from "express";
import {getPaymentByOrderIdController,getPaymentsController} from "../controller/payment.controller";
const router = Router();

router.get("/",getPaymentsController);
router.get("/:order_id",getPaymentByOrderIdController);

export default router;