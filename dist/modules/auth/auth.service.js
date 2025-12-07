"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signupUser = async (payload) => {
    const { name, role, email, password, phone } = payload;
    const hashedPass = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name,role,email,password,phone) VALUES($1, $2, $3, $4,$5) RETURNING id, name, role, email, phone`, [name, role, email, hashedPass, phone]);
    return result;
};
const signinUser = async (email, password) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    const { created_at, updated_at, ...restUser } = result.rows[0];
    if (result.rows.length === 0) {
        return null;
    }
    ;
    const user = result.rows[0];
    const isMatched = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatched) {
        return null;
    }
    ;
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }, config_1.default.jwtSecret, { expiresIn: "5d" });
    delete restUser["password"];
    return { token, restUser };
};
exports.authServices = {
    signupUser,
    signinUser,
};
