import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    trim: {
        type: String,
    },
    bodyType: {
        type: String,
        required: true,
    },
    engineType: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    transmission: {
        type: String,
    },
    drivetrain: {
        type: String,
    },
    horsepower: {
        type: Number,
    },
    torque: {
        type: Number,
    },
    fuelEconomyCity: {
        type: Number,
    },
    fuelEconomyHighway: {
        type: Number,
    },
    fuelTankCapacity: {
        type: Number,
    },
    seatingCapacity: {
        type: Number,
        required: true,
    },
    cargoVolume: {
        type: Number,
    },
    towingCapacity: {
        type: Number,
    },
    curbWeight: {
        type: Number,
    },
    wheelbase: {
        type: Number,
    },
    length: {
        type: Number,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    groundClearance: {
        type: Number,
    },
    safetyFeatures: [{
        type: String,
    }],
    interiorFeatures: [{
        type: String,
    }],
    exteriorFeatures: [{
        type: String,
    }],
    infotainmentSystem: [{
        type: String,
    }],
    warrantyInformation: {
        basic: {
            type: String,
        },
        powertrain: {
            type: String,
        }
    },
    price: {
        type: Number,
        required: true,
    },
    imagePath: {
        type: String,
    },
    showroom: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Showroom',
      }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
