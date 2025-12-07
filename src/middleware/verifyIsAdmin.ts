import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const verifyIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({ status: 401, message: 'Unauthorize access' });
        };

        const token = req.headers.authorization?.split(" ")[1] as string;

        jwt.verify(token, config.jwtSecret as string, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorize access' });
            };

            const { email } = decoded as JwtPayload;
            const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

            let isAdmin = false;
            if (user.rows[0]) {
                isAdmin = user.rows[0].role === "admin";
            }

            if (!isAdmin) {
                return res.status(403).json({ message: 'Forbidden access' });
            };
            next();
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};


export default verifyIsAdmin;