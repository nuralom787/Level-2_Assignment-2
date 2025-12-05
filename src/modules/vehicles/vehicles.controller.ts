import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";


const createVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesService.createVehicles(req.body);

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesService.getVehicles();

        if (!result.rows.length) {
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            })
        };

        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
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

const getSingleVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesService.getSingleVehicles(req.params.vehicleId as string);

        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0]
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "No Data Found!",
                data: []
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

const updateVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesService.updateVehicles(req.body, req.params.vehicleId as string);

        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0]
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "No Data Found!",
                data: []
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

const deleteVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesService.deleteVehicles(req.params.vehicleId as string);

        if (result.command === "DELETE") {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
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

export const vehiclesController = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles,
}