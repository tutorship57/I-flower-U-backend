import { createUserController,getAllUserController,getUserByIdController,deleteUserController,updateUserController, getProfile } from "../controller/user.controller";
import { Router } from "express";
const router = Router();

router.get("/", getAllUserController);
router.get("/me", getProfile);
router.get("/:user_id", getUserByIdController);
router.post("/", createUserController);
router.put("/:user_id", updateUserController);
router.delete("/:user_id", deleteUserController);

export default router;