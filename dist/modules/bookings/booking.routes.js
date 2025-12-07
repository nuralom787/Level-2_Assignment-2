"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const checkAdminOrCustomer_1 = __importDefault(require("../../middleware/checkAdminOrCustomer"));
const router = (0, express_1.Router)();
router.get("/", checkAdminOrCustomer_1.default, booking_controller_1.bookingController.getAllBookings);
router.post("/", booking_controller_1.bookingController.createBooking);
router.put("/:bookingId", checkAdminOrCustomer_1.default, booking_controller_1.bookingController.updateBooking);
exports.bookingRouter = router;
