"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesController = void 0;
const vehicles_service_1 = require("./vehicles.service");
const createVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesService.createVehicles(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const getVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesService.getVehicles();
        if (!result.rows.length) {
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            });
        }
        ;
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
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
const getSingleVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesService.getSingleVehicles(req.params.vehicleId);
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
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const updateVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesService.updateVehicles(req.body, req.params.vehicleId);
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
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const deleteVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesService.deleteVehicles(req.params.vehicleId);
        if (result.command === "DELETE") {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
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
exports.vehiclesController = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles,
};
