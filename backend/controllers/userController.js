import User from '../models/user_model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const {name,address,phone, username, email, password } = req.body;

    if (!name|| !address|| !phone || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            address,
            phone, 
            username,
             email, 
             password:hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error saving user', error: err });
    }
};

export const signInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username }, token });
    } catch (err) {
        res.status(500).json({ message: 'Error signing in user', error: err });
    }
};



export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            name:user.name,
            address:user.address,
            phone:user.phone,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user details', error: err });
    }
};

