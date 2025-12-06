"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const updateUsers = async (req, res) => {
    const body = req.body;
    const userId = req.params.userId;
    try {
        const result = await user_service_1.userServices.updateUsers(body, userId);
        if (result === null) {
            res.status(400).json({
                success: false,
                message: "Bad Request!"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const deleteUsers = async (req, res) => {
    try {
        const result = await user_service_1.userServices.deleteUsers(req.params.userId);
        console.log(result);
        if (result.rowCount > 0) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.userController = {
    getAllUsers,
    updateUsers,
    deleteUsers,
};
