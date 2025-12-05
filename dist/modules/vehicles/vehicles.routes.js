"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesRouter = void 0;
const express_1 = require("express");
const vehicles_controller_1 = require("./vehicles.controller");
const verifyIsAdmin_1 = __importDefault(require("../../middleware/verifyIsAdmin"));
const router = (0, express_1.Router)();
router.get("/", vehicles_controller_1.vehiclesController.getVehicles);
router.get("/:vehicleId", vehicles_controller_1.vehiclesController.getSingleVehicles);
router.post("/", verifyIsAdmin_1.default, vehicles_controller_1.vehiclesController.createVehicles);
router.put("/:vehicleId", verifyIsAdmin_1.default, vehicles_controller_1.vehiclesController.updateVehicles);
router.delete("/:vehicleId", verifyIsAdmin_1.default, vehicles_controller_1.vehiclesController.deleteVehicles);
exports.vehiclesRouter = router;
