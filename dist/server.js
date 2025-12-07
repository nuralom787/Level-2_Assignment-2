"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_route_1 = require("./modules/auth/auth.route");
const vehicles_routes_1 = require("./modules/vehicles/vehicles.routes");
const config_1 = __importDefault(require("./config"));
const user_routes_1 = require("./modules/users/user.routes");
const booking_routes_1 = require("./modules/bookings/booking.routes");
const autoUpdater_1 = __importDefault(require("./config/autoUpdater"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// ! Call/Create Database.
(0, db_1.default)();
// ! Auto Booking Update Function.
(0, autoUpdater_1.default)();
// * User Signin/Signup Routes.
app.use("/api/v1/auth", auth_route_1.authRouter);
// * Vehicle Routes.
app.use("/api/v1/vehicles", vehicles_routes_1.vehiclesRouter);
// * Users Routes.
app.use("/api/v1/users", user_routes_1.userRoutes);
// * Booking Routes.
app.use("/api/v1/bookings", booking_routes_1.bookingRouter);
// ! Default Get.
app.get('/', (req, res) => {
    res.send('Welcome To Rental Server.');
});
// ! Server Listing.
app.listen(config_1.default.port, () => {
    console.log(`Rental Server listening on port ${config_1.default.port}`);
});
