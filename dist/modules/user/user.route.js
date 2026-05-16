import { Router } from "express";
import { userController } from "./user.controller";
const router = Router();
//  create user 
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserByID);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
export const userRoute = router;
//# sourceMappingURL=user.route.js.map