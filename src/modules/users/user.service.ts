import { pool } from "../../config/db";


const getAllUsers = async () => {
    const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);
    return result;
};

const updateUsers = async (body: Record<string, undefined>, userId: string) => {
    const updates = [];
    const values = [];
    let valueIndex = 1;

    const optionalFields = ['name', 'email', 'phone', 'role'];

    if (body.isAdmin || body.sameUser) {
        for (const field of optionalFields) {
            if (body[field] !== undefined && body[field] !== null) {
                updates.push(`${field}=$${valueIndex}`);
                values.push(body[field]);
                valueIndex++;
            }
        };
        values.push(userId);
        const setClause = updates.join(', ');

        const result = await pool.query(`UPDATE users SET ${setClause} WHERE id=$${valueIndex} RETURNING id,name,email,phone,role`, values);

        return result;
    }
    return null;
};

const deleteUsers = async (userId: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [userId]);
    console.log(result);
    return result;
};


export const userServices = {
    getAllUsers,
    updateUsers,
    deleteUsers,
}