"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const autoUpdateBookings = async (bookingId) => {
    try {
        const bookingUpdate = await db_1.pool.query(`UPDATE bookings SET status='returned' WHERE id=$1 AND status='active' RETURNING vehicle_id`, [bookingId]);
        if (bookingUpdate.rows.length === 0) {
            await db_1.pool.query('ROLLBACK');
            return;
        }
        const vehicleId = bookingUpdate.rows[0].vehicle_id;
        await db_1.pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [vehicleId]);
    }
    catch (error) {
        await db_1.pool.query('ROLLBACK');
        throw error;
    }
};
exports.default = autoUpdateBookings;
