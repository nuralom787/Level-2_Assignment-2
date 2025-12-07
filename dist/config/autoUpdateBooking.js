"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const autoUpdateBookings = async (bookingId) => {
    const client = db_1.pool.connect();
    try {
        (await client).query('BEGIN');
        const bookingUpdate = await (await client).query(`UPDATE bookings SET status='returned' WHERE id=$1 AND status='active' RETURNING vehicle_id`, [bookingId]);
        if (bookingUpdate.rows.length === 0) {
            (await client).query('ROLLBACK');
            return;
        }
        const vehicleId = bookingUpdate.rows[0].vehicle_id;
        (await client).query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [vehicleId]);
        (await client).query('COMMIT');
    }
    catch (error) {
        (await client).query('ROLLBACK');
        throw error;
    }
};
exports.default = autoUpdateBookings;
