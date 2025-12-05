import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRouter } from "./modules/auth/auth.route";
import { vehiclesRouter } from "./modules/vehicles/vehicles.routes";
import config from "./config";

const app = express()
const port = 5000;

// ! init express body parser.
app.use(express.json());


// ! Call/Create Database.
initDB();


// * User Signin/Signup Routes.
app.use("/api/v1/auth", authRouter);


// * Vehicle Routes.
app.use("/api/v1/vehicles", vehiclesRouter);




// ! Default Get.
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome To Rental Server.')
});


// ! Server Listing.
app.listen(config.port, () => {
    console.log(`Rental Server listening on port ${config.port}`)
});
