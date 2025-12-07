import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
    try {
        const result = await authServices.signupUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    };
};

const signinUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authServices.signinUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token: result?.token,
                user: result?.restUser
            }
        });
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    };
};

export const authController = {
    signupUser,
    signinUser,
};