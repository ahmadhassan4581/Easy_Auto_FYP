import mongoose from 'mongoose';

const showroomOwnerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('ShowroomOwner', showroomOwnerSchema);
