import { requireRole } from "../../../shared/guards/role.guard";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { createUserController,getAllUserController,getUserByIdController,deleteUserController,updateUserController, getProfile } from "../controller/user.controller";
import { Router } from "express";
const router = Router();

router.get("/",requireRole('admin'), getAllUserController);
router.get("/me", getProfile);
router.get("/:user_id", getUserByIdController);
router.post("/",sessionAuth,requireRole('admin'), createUserController);
router.put("/:user_id",sessionAuth,requireRole('admin','user'),updateUserController);
router.delete("/:user_id",sessionAuth,requireRole('admin'),deleteUserController);

export default router;