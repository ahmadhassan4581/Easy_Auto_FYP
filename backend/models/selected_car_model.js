import mongoose from 'mongoose';

const selectedCarSchema = new mongoose.Schema({
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
  addedAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.model('SelectedCar', selectedCarSchema);
