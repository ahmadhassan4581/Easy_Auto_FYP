import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ShowroomOwner from '../models/showroom_owner_model.js';

export const createAccount = async (req, res) => {
  const { ownerName, email, password } = req.body;

  if (!ownerName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingOwner = await ShowroomOwner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newOwner = new ShowroomOwner({
      ownerName,
      email,
      password: hashedPassword,
    });

    const savedOwner = await newOwner.save();
    res.status(201).json({ message: 'Account created successfully', savedOwner });
  } catch (err) {
    res.status(500).json({ message: 'Error creating account', error: err });
  }
};

// Sign in
export const signIn = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      const owner = await ShowroomOwner.findOne({ email });
      if (!owner) {
        return res.status(400).json({ message: 'Account does not exist.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, owner.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ id: owner._id, email: owner.email }, 'your_secret_key', { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', owner: { id: owner._id, ownerName: owner.ownerName }, token });
    } catch (err) {
      res.status(500).json({ message: 'Error signing in', error: err });
    }
  };

  export const getOwnerById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const owner = await ShowroomOwner.findById(id).select('-password'); 
      if (!owner) {
        return res.status(404).json({ message: 'Owner not found' });
      }
  
      res.json({
        ownerName: owner.ownerName,
        email: owner.email,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving owner information', error: err });
    }
  };
  
