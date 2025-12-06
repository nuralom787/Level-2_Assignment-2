import { Request, Response } from "express";
import { bookingService } from "./booking.service";


const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.createBooking(req.body);

        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: result.data
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getAllBookings(req.body);

        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const bookingController = {
    createBooking,
    getAllBookings,
}