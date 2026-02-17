import {Router} from "express";
import {getPaymentByOrderIdController,getPaymentsController} from "../controller/payment.controller";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
import { userResourceOwnershipGuard} from "../../../shared/guards/ownership.guard";
const router = Router();

router.get("/",sessionAuth,requireRole('user','admin'),getPaymentsController);
router.get("/:order_id",sessionAuth,requireRole('user','admin'),getPaymentByOrderIdController);
export default router;