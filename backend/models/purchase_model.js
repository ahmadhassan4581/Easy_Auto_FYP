import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  showroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showroom', required: true }, // New field
  carPrice: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

export default Purchase;
