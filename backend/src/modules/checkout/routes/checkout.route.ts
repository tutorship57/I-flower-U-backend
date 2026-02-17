import {Router } from "express";

import { checkoutController } from "../controller/checkout.controller";
import {requireRole} from '../../../shared/guards/role.guard'
import {sessionAuth} from '../../../shared/guards/session.guard'

const router = Router();

router.post('/',sessionAuth,requireRole('user'),checkoutController);

export default router;