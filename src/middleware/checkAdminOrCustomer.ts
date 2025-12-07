import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const checkAdminOrCustomer = async (req: Request, res: Response, next: NextFunction) => {
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

            let isAdmin;
            let isCustomer;
            let sameUser;
            let userId;

            if (user.rows[0]) {
                isAdmin = user.rows[0].role === "admin";
                isCustomer = user.rows[0].role === "customer";
                sameUser = user.rows[0].id === parseFloat(req.params.userId as string);
                userId = user.rows[0].id
            };

            if (!req.body) {
                req.body = { isAdmin, isCustomer, sameUser: sameUser, userId };
            }
            else {
                req.body.isAdmin = isAdmin
                req.body.isCustomer = isCustomer
                req.body.sameUser = sameUser
                req.body.userId = userId
            }


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


export default checkAdminOrCustomer;