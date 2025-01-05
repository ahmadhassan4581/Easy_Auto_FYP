import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{type: String, required: true},
  username: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});


export default mongoose.model('User', userSchema);
