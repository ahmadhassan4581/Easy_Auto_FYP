import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import ownerRoutes from './routes/showroomOwnerRoute.js';
import showroomRoutes from './routes/showroom_routes.js';
import carRoutes from "./routes/car_routes.js";
import paymentRoutes from './routes/paymentRoutes.js';
import cors from 'cors';
import purchaseRoutes from './routes/purchase_route.js';
import reviewRoutes from './routes/reviewRoutes.js';
import maintenanceServiceRoutes from './routes/maintenanceServiceRoutes.js';
import { scheduleEmailReminders } from './emailScheduler.js'; // Import the scheduler

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/showrooms', showroomRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/maintenance-services', maintenanceServiceRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Schedule email reminders
scheduleEmailReminders();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
