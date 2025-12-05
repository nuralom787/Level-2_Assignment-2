import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    result.rows[0].daily_rent_price = parseFloat(daily_rent_price as string);

    return result;
};

const getVehicles = async () => {
    const result = await pool.query(`SELECT id, vehicle_name, type, registration_number, daily_rent_price::float8 AS daily_rent_price,availability_status FROM vehicles`);

    return result;
};

const getSingleVehicles = async (vehicleId: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicleId]);

    const daily_rent_price = result.rows[0].daily_rent_price;

    result.rows[0].daily_rent_price = parseFloat(daily_rent_price as string);

    return result;
};

const updateVehicles = async (payload: Record<string, unknown>, vehicleId: string) => {
    const updates = [];
    const values = [];
    let valueIndex = 1;

    const optionalFields = ['vehicle_name', 'type', 'registration_number', 'daily_rent_price', 'availability_status'];

    for (const field of optionalFields) {
        if (payload[field] !== undefined && payload[field] !== null) {
            updates.push(`${field}=$${valueIndex}`);
            if (field === 'daily_rent_price') {
                values.push(Number(payload[field]));
            } else {
                values.push(payload[field]);
            }
            valueIndex++;
        }
    };
    values.push(vehicleId);
    const setClause = updates.join(', ');

    const result = await pool.query(`UPDATE vehicles SET ${setClause} WHERE id=$${valueIndex} RETURNING *`, values);

    result.rows[0].daily_rent_price = parseFloat(payload.daily_rent_price || result.rows[0].daily_rent_price);

    return result
};

const deleteVehicles = async (vehicleId: string) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [vehicleId]);
    return result;
}

export const vehiclesService = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles,
};