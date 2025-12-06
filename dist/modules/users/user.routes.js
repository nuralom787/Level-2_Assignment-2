"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const verifyIsAdmin_1 = __importDefault(require("../../middleware/verifyIsAdmin"));
const checkAdminOrCustomer_1 = __importDefault(require("../../middleware/checkAdminOrCustomer"));
const router = (0, express_1.Router)();
router.get("/", verifyIsAdmin_1.default, user_controller_1.userController.getAllUsers);
router.put("/:userId", checkAdminOrCustomer_1.default, user_controller_1.userController.updateUsers);
router.delete("/:userId", verifyIsAdmin_1.default, user_controller_1.userController.deleteUsers);
exports.userRoutes = router;
