"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_route_1 = require("./modules/auth/auth.route");
const vehicles_routes_1 = require("./modules/vehicles/vehicles.routes");
const app = (0, express_1.default)();
const port = 5000;
// ! init express body parser.
app.use(express_1.default.json());
// ! Call/Create Database.
(0, db_1.default)();
// * User Signin/Signup Routes.
app.use("/api/v1/auth", auth_route_1.authRouter);
// * Vehicle Routes.
app.use("/api/v1/vehicles", vehicles_routes_1.vehiclesRouter);
// ! Default Get.
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// ! Server Listing.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
