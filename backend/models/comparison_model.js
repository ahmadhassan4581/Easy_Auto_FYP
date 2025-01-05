import mongoose from 'mongoose';

const vehicleComparisonSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comparedVehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
    }],
    dateCompared: {
        type: Date,
        default: Date.now,
    }
});

const VehicleComparison = mongoose.model('VehicleComparison', vehicleComparisonSchema);
export default VehicleComparison;
