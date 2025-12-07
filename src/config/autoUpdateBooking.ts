import { pool } from "./db";


const autoUpdateBookings = async (bookingId: string) => {
    try {
        const bookingUpdate = await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1 AND status='active' RETURNING vehicle_id`, [bookingId]);

        if (bookingUpdate.rows.length === 0) {
            await pool.query('ROLLBACK');
            return;
        }

        const vehicleId = bookingUpdate.rows[0].vehicle_id;

        await pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [vehicleId]);
    }
    catch (error) {
        await pool.query('ROLLBACK');
        throw error;
    }
};


export default autoUpdateBookings;