import { Router } from "express";
import { bookingController } from "./booking.controller";
import checkAdminOrCustomer from "../../middleware/checkAdminOrCustomer";

const router = Router();

router.get("/", checkAdminOrCustomer, bookingController.getAllBookings);

router.post("/", bookingController.createBooking);

router.put("/:bookingId", checkAdminOrCustomer, bookingController.updateBooking);

export const bookingRouter = router;