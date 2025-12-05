import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";

const signupUser = async (payload: Record<string, unknown>) => {
    const { name, role, email, password, phone } = payload;

    const hashedPass = await bcrypt.hash(password as string, 10);

    const result = await pool.query(`INSERT INTO users(name,role,email,password,phone) VALUES($1, $2, $3, $4,$5) RETURNING id, name, role, email, phone`, [name, role, email, hashedPass, phone]);

    return result;
};


const signinUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (result.rows.length === 0) {
        return null;
    };

    const user = result.rows[0];

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        return null
    };


    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }, config.jwtSecret as string, { expiresIn: "5d" });

    delete user["password"];

    return { token, user }
};


export const authServices = {
    signupUser,
    signinUser,
}