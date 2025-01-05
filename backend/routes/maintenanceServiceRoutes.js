import express from 'express';
import {
    createMaintenanceService,
    getMaintenanceServicesByCarId,
    getAllMaintenanceServices,
} from '../controllers/maintenanceServiceController.js';

const router = express.Router();
router.post('/', createMaintenanceService);

router.get('/:carId', getMaintenanceServicesByCarId);

router.get('/', getAllMaintenanceServices);

export default router;
