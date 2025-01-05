import mongoose from "mongoose";

const showroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true }, 
  longitude: { type: Number, required: true }, 
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShowroomOwner',
    required: true,
  },
});

export default mongoose.model('Showroom', showroomSchema);


