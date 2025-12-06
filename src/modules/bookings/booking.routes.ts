import { Router } from "express";
import { bookingController } from "./booking.controller";
import checkAdminOrCustomer from "../../middleware/checkAdminOrCustomer";

const router = Router();

router.post("/", bookingController.createBooking);

router.get("/", checkAdminOrCustomer, bookingController.getAllBookings);

export const bookingRouter = router;