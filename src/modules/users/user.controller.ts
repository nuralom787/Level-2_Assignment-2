import { Request, Response } from "express";
import { userServices } from "./user.service";


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsers();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateUsers = async (req: Request, res: Response) => {
    const body = req.body;
    const userId = req.params.userId;

    try {
        const result = await userServices.updateUsers(body, userId as string);

        if (result === null) {
            res.status(400).json({
                success: false,
                message: "Bad Request!"
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            });
        }
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const deleteUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUsers(req.params.userId as string);
        console.log(result);

        if (result.rowCount! > 0) {
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
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const userController = {
    getAllUsers,
    updateUsers,
    deleteUsers,
}