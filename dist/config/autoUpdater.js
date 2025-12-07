"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("./db");
const autoUpdateBooking_1 = __importDefault(require("./autoUpdateBooking"));
async function checkAndUpdateBookings() {
    try {
        const updateBooking = await db_1.pool.query(`SELECT id FROM bookings WHERE status='active' AND rent_end_date < NOW()`);
        for (const row of updateBooking.rows) {
            try {
                await (0, autoUpdateBooking_1.default)(row.id);
            }
            catch (error) {
                console.error(`Failed to process auto-return for ID: ${row.id}`);
            }
        }
    }
    catch (dbError) {
        console.error('Database query error during auto-return check:', dbError);
    }
}
;
function autoBookingUpdater() {
    node_cron_1.default.schedule("* * * * *", checkAndUpdateBookings);
}
exports.default = autoBookingUpdater;
