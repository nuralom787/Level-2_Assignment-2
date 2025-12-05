import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import verifyIsAdmin from "../../middleware/verifyIsAdmin";

const router = Router();

router.get("/", vehiclesController.getVehicles);

router.get("/:vehicleId", vehiclesController.getSingleVehicles);

router.post("/", verifyIsAdmin, vehiclesController.createVehicles);

router.put("/:vehicleId", verifyIsAdmin, vehiclesController.updateVehicles);

router.delete("/:vehicleId", verifyIsAdmin, vehiclesController.deleteVehicles);

export const vehiclesRouter = router;