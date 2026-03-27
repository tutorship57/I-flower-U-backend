

import { Router } from "express";
import { getRerservationStocksController } from "../controller/reservation.controller";
import { requireRole } from "../../../shared/guards/role.guard";
import { sessionAuth } from "../../../shared/guards/session.guard";

const router = Router({
    mergeParams: true,
})

router.get('/',sessionAuth,requireRole('seller','admin'),getRerservationStocksController)

export default router;