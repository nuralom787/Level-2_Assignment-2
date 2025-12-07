"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesService = void 0;
const db_1 = require("../../config/db");
const createVehicles = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    result.rows[0].daily_rent_price = parseFloat(daily_rent_price);
    const { created_at, updated_at, ...restData } = result.rows[0];
    return restData;
};
const getVehicles = async () => {
    const result = await db_1.pool.query(`SELECT id, vehicle_name, type, registration_number, daily_rent_price::float8 AS daily_rent_price,availability_status FROM vehicles`);
    return result;
};
const getSingleVehicles = async (vehicleId) => {
    const result = await db_1.pool.query(`SELECT id,vehicle_name,type,registration_number,daily_rent_price,availability_status FROM vehicles WHERE id=$1`, [vehicleId]);
    if (result.rowCount <= 0) {
        throw new Error("No Vehicles Found For This ID");
    }
    ;
    ;
    const daily_rent_price = result.rows[0].daily_rent_price;
    result.rows[0].daily_rent_price = parseFloat(daily_rent_price);
    return result;
};
const updateVehicles = async (payload, vehicleId) => {
    const updates = [];
    const values = [];
    let valueIndex = 1;
    const optionalFields = ['vehicle_name', 'type', 'registration_number', 'daily_rent_price', 'availability_status'];
    for (const field of optionalFields) {
        if (payload[field] !== undefined && payload[field] !== null) {
            updates.push(`${field}=$${valueIndex}`);
            if (field === 'daily_rent_price') {
                values.push(Number(payload[field]));
            }
            else {
                values.push(payload[field]);
            }
            valueIndex++;
        }
    }
    ;
    values.push(vehicleId);
    const setClause = updates.join(', ');
    const result = await db_1.pool.query(`UPDATE vehicles SET ${setClause} WHERE id=$${valueIndex} RETURNING id,vehicle_name,type,registration_number,daily_rent_price,availability_status`, values);
    if (result.rowCount <= 0) {
        throw new Error("No Vehicles Found For This ID");
    }
    result.rows[0].daily_rent_price = parseFloat(payload.daily_rent_price || result.rows[0].daily_rent_price);
    return result;
};
const deleteVehicles = async (vehicleId) => {
    const result = await db_1.pool.query(`DELETE FROM vehicles WHERE id=$1`, [vehicleId]);
    if (result.rowCount <= 0) {
        throw new Error("No Vehicles Found For This ID");
    }
    ;
    return result;
};
exports.vehiclesService = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles,
};
