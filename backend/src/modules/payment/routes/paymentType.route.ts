import { createPaymentController } from "../controller/paymentType.controller";
import {Router} from "express";


const router = Router();

router.post('/', createPaymentController);


export default router;