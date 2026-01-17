import { createUserController,getAllUserController,getUserByIdController,deleteUserController,updateUserController } from "../controller/user.controller";
import { Router } from "express";
const router = Router();

router.get("/", getAllUserController);
router.get("/:user_id", getUserByIdController);
router.post("/", createUserController);
router.put("/:user_id", updateUserController);
router.delete("/:user_id", deleteUserController);

export default router;