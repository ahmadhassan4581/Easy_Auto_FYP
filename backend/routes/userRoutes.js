import express from 'express';
import { getUserById, createUser, signInUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserById);

router.post('/createUser', createUser);

router.post('/signInUser', signInUser);

export default router;
