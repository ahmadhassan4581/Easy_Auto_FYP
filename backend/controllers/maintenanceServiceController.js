import MaintenanceService from '../models/maintenance_service_model.js';

// Controller to create a new maintenance service record
export const createMaintenanceService = async (req, res) => {
    const {
        carId,
        userId,
        description,
        odometerReading,
        serviceDetails,
        totalCost,
        nextServiceDue,
    } = req.body;

    // Validate required fields
    if (!carId || !userId || !description || !odometerReading || !serviceDetails || !totalCost || !nextServiceDue) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create a new maintenance service record
        const newRecord = new MaintenanceService({
            carId,
            userId,
            description,
            odometerReading,
            serviceDetails,
            totalCost,
            nextServiceDue,
        });

        // Save the record to the database
        await newRecord.save();

        return res
            .status(201)
            .json({ message: 'Maintenance service record created successfully.', data: newRecord });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to create maintenance service record.', error: error.message });
    }
};

// Controller to get maintenance service records by carId
export const getMaintenanceServicesByCarId = async (req, res) => {
    const { carId } = req.params;

    if (!carId) {
        return res.status(400).json({ message: 'Car ID is required.' });
    }

    try {
        // Fetch maintenance service records by carId
        const records = await MaintenanceService.find({ carId })
            .populate('carId')
            .populate('userId');

        if (!records.length) {
            return res.status(404).json({ message: 'No maintenance service records found for the specified car ID.' });
        }

        return res
            .status(200)
            .json({ message: 'Maintenance service records retrieved successfully.', data: records });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to fetch maintenance service records.', error: error.message });
    }
};

// Controller to get all maintenance service records
export const getAllMaintenanceServices = async (req, res) => {
    try {
        // Fetch all maintenance service records
        const records = await MaintenanceService.find().populate('carId').populate('userId');

        if (!records.length) {
            return res.status(404).json({ message: 'No maintenance service records found.' });
        }

        return res
            .status(200)
            .json({ message: 'All maintenance service records retrieved successfully.', data: records });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to fetch maintenance service records.', error: error.message });
    }
};
