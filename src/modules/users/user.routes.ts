import { Router } from "express";
import { userController } from "./user.controller";
import verifyIsAdmin from "../../middleware/verifyIsAdmin";
import checkAdminOrCustomer from "../../middleware/checkAdminOrCustomer";

const router = Router();

router.get("/", verifyIsAdmin, userController.getAllUsers);

router.put("/:userId", checkAdminOrCustomer, userController.updateUsers);

router.delete("/:userId", verifyIsAdmin, userController.deleteUsers);


export const userRoutes = router;