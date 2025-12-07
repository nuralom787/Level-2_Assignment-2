import cron from "node-cron";
import { pool } from "./db";
import autoUpdateBookings from "./autoUpdateBooking";

async function checkAndUpdateBookings() {
    try {
        const updateBooking = await pool.query(`SELECT id FROM bookings WHERE status='active' AND rent_end_date < NOW()`);

        for (const row of updateBooking.rows) {
            try {
                await autoUpdateBookings(row.id);
            }
            catch (error) {
                console.error(`Failed to process auto-return for ID: ${row.id}`);
            }
        }
    }
    catch (dbError) {
        console.error('Database query error during auto-return check:', dbError);
    }
};

function autoBookingUpdater() {
    cron.schedule("* * * * *", checkAndUpdateBookings);
}

export default autoBookingUpdater;