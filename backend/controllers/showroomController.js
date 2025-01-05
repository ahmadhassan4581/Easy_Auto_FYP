import Showroom from '../models/showroom_model.js';
import ShowroomOwner from '../models/showroom_owner_model.js';

export const createShowroom = async (req, res) => {
  const { name, latitude, longitude, ownerId } = req.body;
  if (!name || latitude == null || longitude == null || !ownerId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const owner = await ShowroomOwner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const newShowroom = new Showroom({
      name,
      latitude,
      longitude,
      owner: ownerId,
    });

    const savedShowroom = await newShowroom.save();
    res.status(201).json({ message: 'Showroom created successfully', showroom: savedShowroom });
  } catch (err) {
    res.status(500).json({ message: 'Error creating showroom', error: err });
  }
};

export const getShowroomsByOwner = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const owner = await ShowroomOwner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const showrooms = await Showroom.find({ owner: ownerId });
    res.status(200).json(showrooms);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving showrooms', error: err });
  }
};

export const getAllShowrooms = async (req, res) => {
  try {
    const showrooms = await Showroom.find().populate('owner', 'ownerName email');
    res.status(200).json(showrooms);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving showrooms', error: err });
  }
};

export const getShowroomById = async (req, res) => {
  const { id } = req.params;

  try {
    const showroom = await Showroom.findById(id).populate('owner', 'ownerName email');
    if (!showroom) {
      return res.status(404).json({ message: 'Showroom not found' });
    }
    res.status(200).json(showroom);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving showroom', error: err });
  }
};