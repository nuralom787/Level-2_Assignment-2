"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.createBooking(req.body);
        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: result.data
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const getAllBookings = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.getAllBookings(req.body);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.bookingController = {
    createBooking,
    getAllBookings,
};
