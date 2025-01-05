import Car from '../models/car_model.js';
import cloudinary from '../config/cloudinary.js';
import upload from '../config/multer-config.js';

export const createCar = async (req, res) => {
  try {
    // Handle file upload
    await new Promise((resolve, reject) => {
      upload.single('imagePath')(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    let imagePath = '';
    if (req.file) {
      // Wrapping the upload_stream in a Promise
      imagePath = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'cars' },
          (error, result) => {
            if (error) {
              return reject('Error uploading image to Cloudinary');
            }
            resolve(result.secure_url);
          }
        );

        // Sending the file buffer to Cloudinary
        stream.end(req.file.buffer);
      });
    }

    const {
      make, model, year, trim, bodyType, engineType, fuelType, transmission,
      drivetrain, horsepower, torque, fuelEconomyCity, fuelEconomyHighway,
      fuelTankCapacity, seatingCapacity, cargoVolume, towingCapacity, curbWeight,
      wheelbase, length, width, height, groundClearance, safetyFeatures,
      interiorFeatures, exteriorFeatures, infotainmentSystem, warrantyInformation,
      price, showroom
    } = req.body;

    // Create a new car object
    const newCar = new Car({
      make, model, year, trim, bodyType, engineType, fuelType, transmission,
      drivetrain, horsepower, torque, fuelEconomyCity, fuelEconomyHighway,
      fuelTankCapacity, seatingCapacity, cargoVolume, towingCapacity, curbWeight,
      wheelbase, length, width, height, groundClearance, safetyFeatures,
      interiorFeatures, exteriorFeatures, infotainmentSystem, warrantyInformation,
      price, imagePath, showroom,
    });

    // Save the new car to the database
    const savedCar = await newCar.save();
    res.status(201).json({ message: 'Car created successfully', car: savedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating car', error });
  }
};


// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find()
      .populate('showroom', 'name latitude longitude'); // Include latitude and longitude
    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving cars', error: err });
  }
};


// Get car by ID
// Get car by ID
export const getCarById = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id)
      .populate('showroom', 'name latitude longitude'); // Include latitude and longitude
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving car details', error: err });
  }
};

