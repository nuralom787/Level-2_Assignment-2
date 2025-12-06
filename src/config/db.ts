import { Pool } from "pg";
import config from ".";

// DB.
export const pool = new Pool({
    connectionString: `${config.connection_str}`
});

const initDB = async () => {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS Users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            CONSTRAINT chk_email_lowercase CHECK (email = LOWER(email)),
            password TEXT NOT NULL,
            CONSTRAINT chk_password_length CHECK (LENGTH(password) >= 6),
            phone VARCHAR(15) NOT NULL,
            role VARCHAR(50) NOT NULL,
            CONSTRAINT chk_user_role CHECK (role IN ('admin', 'customer')),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS Vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(100) NOT NULL,
        CONSTRAINT chk_vehicles_type CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price NUMERIC(10, 2) NOT NULL,
        CONSTRAINT chk_daily_rent_price CHECK (daily_rent_price > 0),
        availability_status VARCHAR(100) NOT NULL,
        CONSTRAINT chk_availability_status CHECK (availability_status IN ('available', 'booked')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS Bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL,
        CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE RESTRICT,
        vehicle_id INT NOT NULL,
        CONSTRAINT fk_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE RESTRICT,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        CONSTRAINT chk_rent_end_date CHECK (rent_end_date > rent_start_date),
        total_price NUMERIC(10, 2) NOT NULL,
        CONSTRAINT chk_total_price_positive CHECK (total_price > 0),
        status VARCHAR(50) NOT NULL,
        CONSTRAINT chk_booking_status CHECK (status IN ('active', 'cancelled', 'returned')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
};

export default initDB;