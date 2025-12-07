"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const db_1 = require("../config/db");
const checkAdminOrCustomer = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({ status: 401, message: 'Unauthorize access' });
        }
        ;
        const token = req.headers.authorization?.split(" ")[1];
        jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorize access' });
            }
            ;
            const { email } = decoded;
            const user = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
            let isAdmin;
            let isCustomer;
            let sameUser;
            let userId;
            if (user.rows[0]) {
                isAdmin = user.rows[0].role === "admin";
                isCustomer = user.rows[0].role === "customer";
                sameUser = user.rows[0].id === parseFloat(req.params.userId);
                userId = user.rows[0].id;
            }
            ;
            if (!req.body) {
                req.body = { isAdmin, isCustomer, sameUser: sameUser, userId };
            }
            else {
                req.body.isAdmin = isAdmin;
                req.body.isCustomer = isCustomer;
                req.body.sameUser = sameUser;
                req.body.userId = userId;
            }
            next();
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.default = checkAdminOrCustomer;
