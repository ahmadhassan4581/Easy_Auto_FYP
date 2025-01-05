import express from 'express';
import { createShowroom, getShowroomsByOwner, getAllShowrooms, getShowroomById } from '../controllers/showroomController.js';
const router = express.Router();

router.post('/create', createShowroom);
router.get('/owner/:ownerId', getShowroomsByOwner);
router.get('/all', getAllShowrooms);
router.get('/:id', getShowroomById); // Route to get showroom by ID

export default router;