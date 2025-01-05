import express from 'express';
import { createCar, getAllCars, getCarById } from '../controllers/car_controller.js';

const router = express.Router();

router.post('/create', createCar);

router.get('/all', getAllCars);

router.get('/:id', getCarById);

export default router;
