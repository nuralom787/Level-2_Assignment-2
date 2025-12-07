"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const signupUser = async (req, res) => {
    try {
        const result = await auth_service_1.authServices.signupUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
    ;
};
const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await auth_service_1.authServices.signinUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token: result?.token,
                user: result?.restUser
            }
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
    ;
};
exports.authController = {
    signupUser,
    signinUser,
};
