import mongoose from 'mongoose';

const maintenanceServiceSchema = new mongoose.Schema({
    carId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Car', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    odometerReading: {
        type: Number,
        required: true,
        min: [0, 'Odometer reading cannot be negative.']
    },
    serviceDetails: {
        type: [String],
        validate: [arrayLimit, 'Service details must have at least one entry.']
    },
    totalCost: {
        type: Number,
        required: true,
        min: [0, 'Total cost cannot be negative.']
    },
    nextServiceDue: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.date;
            },
            message: 'Next service due must be after the current service date.'
        }
    }
});

// Helper function to validate the serviceDetails array
function arrayLimit(val) {
    return val && val.length > 0;
}

// Add an index to optimize querying by carId and userId
maintenanceServiceSchema.index({ carId: 1, userId: 1, date: 1 });



export default mongoose.model('MaintenanceService', maintenanceServiceSchema);

