import moment from "moment";
import { pool } from "../../config/db";


const createBooking = async (payload: Record<string, undefined>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const startDate = moment(rent_start_date);
    const endDate = moment(rent_end_date);

    const totalDays = endDate.diff(startDate, 'days') + 1;

    if (totalDays <= 0) {
        throw new Error("The End date must be after start date.");
    };

    const vehicleRes = await pool.query(`SELECT daily_rent_price, availability_status, vehicle_name FROM vehicles WHERE id=$1 FOR UPDATE`, [vehicle_id]);

    if (vehicleRes.rowCount === 0) {
        throw new Error(`Vehicle with ID ${vehicle_id} not found.`);
    };

    const vehicle = vehicleRes.rows[0];

    if (vehicle.availability_status !== 'available') {
        throw new Error(`Vehicle is currently ${vehicle.availability_status}. Cannot book.`);
    };

    const dailyRentPrice = vehicle.daily_rent_price;
    const total_price = totalDays * dailyRentPrice;

    const bookingRes = await pool.query(`INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]);

    const newBooking = bookingRes.rows[0];

    const vehiclesUpRes = await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id]);

    return {
        data: {
            ...newBooking,
            vehicle: {
                vehicle_name: vehicle.vehicle_name,
                daily_rent_price: dailyRentPrice
            }
        }
    };
};

const getAllBookings = async (payload: Record<string, undefined>) => {

    let result;
    let finalResult;

    if (payload.isAdmin) {
        result = await pool.query(`SELECT 
            b.id, 
            b.customer_id, 
            b.vehicle_id, 
            b.rent_start_date, 
            b.rent_end_date, 
            b.total_price, 
            b.status,
            u.name,       
            u.email,       
            v.vehicle_name,                 
            v.registration_number           
            FROM bookings b
            JOIN users u ON b.customer_id = u.id
            JOIN vehicles v ON b.vehicle_id = v.id
            `)

        finalResult = result?.rows.map(row => {
            return {
                id: row.id,
                customer_id: row.customer_id,
                vehicle_id: row.vehicle_id,
                rent_start_date: row.rent_start_date,
                rent_end_date: row.rent_end_date,
                total_price: parseFloat(row.total_price),
                status: row.status,
                customer: {
                    name: row.name,
                    email: row.email
                },
                vehicle: {
                    vehicle_name: row.vehicle_name,
                    registration_number: row.registration_number,
                    type: row.type
                }
            };
        });
    };

    if (payload.isCustomer) {
        result = await pool.query(`SELECT 
            b.id,
            b.vehicle_id,
            b.rent_start_date,
            b.rent_end_date,
            b.total_price,
            b.status,
            v.vehicle_name,
            v.registration_number,
            v.type
            FROM bookings b
            JOIN vehicles v ON b.vehicle_id=v.id WHERE b.customer_id=$1`, [payload.userId])

        finalResult = result?.rows.map(row => {
            return {
                id: row.id,
                vehicle_id: row.vehicle_id,
                rent_start_date: row.rent_start_date,
                rent_end_date: row.rent_end_date,
                total_price: parseFloat(row.total_price),
                status: row.status,
                vehicle: {
                    vehicle_name: row.vehicle_name,
                    registration_number: row.registration_number,
                    type: row.type
                }
            };
        });
    };


    return finalResult;
};

const updateBooking = async (payload: Record<string, undefined>, bookingId: string) => {
    let finalResult;
    const { status, isAdmin, isCustomer, userId } = payload;

    if (!isAdmin && isCustomer && status === "cancelled") {
        const bookingRes = await pool.query(`SELECT customer_id, vehicle_id FROM bookings WHERE id=$1`, [bookingId]);

        if (userId !== bookingRes.rows[0].customer_id) {
            throw new Error("Access Block!");
        };

        const returningData = "id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status";

        const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING ${returningData}`, [status, bookingId]);

        const vehicleRes = await pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [bookingRes.rows[0].vehicle_id]);

        finalResult = {
            success: true,
            message: "Booking cancelled successfully",
            data: result.rows[0]
        }
        return finalResult;
    };

    if (isAdmin && !isCustomer && status === "returned") {
        const returningData = "id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status";

        const bookingRes = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING ${returningData}`, [status, bookingId]);

        const vehicleRes = await pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1 RETURNING availability_status`, [bookingRes.rows[0].vehicle_id]);
        const availability_status = vehicleRes.rows[0].availability_status;

        finalResult = {
            success: true,
            message: "Booking marked as returned. Vehicle is now available",
            data: {
                ...bookingRes.rows[0],
                vehicle: {
                    availability_status
                }
            }
        };

        return finalResult;
    }
};

export const bookingService = {
    createBooking,
    getAllBookings,
    updateBooking,
}