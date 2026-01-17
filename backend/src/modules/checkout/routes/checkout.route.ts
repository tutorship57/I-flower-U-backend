import {Router } from "express";

import { checkoutController } from "../controller/checkout.controller";

const router = Router();

router.post('/', checkoutController);

export default router;