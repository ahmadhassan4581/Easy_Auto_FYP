import express from 'express';
import { createAccount, signIn, getOwnerById } from '../controllers/showroomOwnerController.js';

const router = express.Router();

router.get('/:id', getOwnerById);

router.post('/createowner', createAccount);

router.post('/signInOwner', signIn);

export default router;