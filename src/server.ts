import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRouter } from "./modules/auth/auth.route";
import { vehiclesRouter } from "./modules/vehicles/vehicles.routes";
import config from "./config";
import { userRoutes } from "./modules/users/user.routes";
import { bookingRouter } from "./modules/bookings/booking.routes";

const app = express();
app.use(express.json());


// ! Call/Create Database.
initDB();


// * User Signin/Signup Routes.
app.use("/api/v1/auth", authRouter);


// * Vehicle Routes.
app.use("/api/v1/vehicles", vehiclesRouter);


// * Users Routes.
app.use("/api/v1/users", userRoutes);



// * Booking Routes.
app.use("/api/v1/bookings", bookingRouter);




// ! Default Get.
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome To Rental Server.')
});


// ! Server Listing.
app.listen(config.port, () => {
    console.log(`Rental Server listening on port ${config.port}`)
});
