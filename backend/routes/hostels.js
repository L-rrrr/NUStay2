const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');

// Get all hostels
router.get('/', async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single hostel by ID
router.get('/:id', async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new hostel
router.post('/', async (req, res) => {
  const hostel = new Hostel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    type: req.body.type,
    imageUrls: req.body.imageUrl,
    averageRating: req.body.averageRating,
    ratings: req.body.ratings,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  try {
    const newHostel = await hostel.save();
    res.status(201).json(newHostel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rate a hostel
router.post('/rate-hostel/:id', async (req, res) => {
    const { userId, rating } = req.body;
  
    if (!userId || !rating) {
      return res.status(400).json({ message: 'UserId and rating are required' });
    }
  
    try {
      const hostel = await Hostel.findById(req.params.id);
  
      if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
      }
  
      // Update the user's rating or add a new one
      const existingRating = hostel.ratings.find(r => r.userId === userId);
  
      if (existingRating) {
        existingRating.rating = rating;
      } else {
        hostel.ratings.push({ userId, rating });
      }
  
      // Update average rating
      const totalRatings = hostel.ratings.reduce((acc, curr) => acc + curr.rating, 0);
      hostel.averageRating = (totalRatings / hostel.ratings.length).toFixed(1); // Round to 1 decimal places
  
      await hostel.save();
  
      res.json(hostel);
    } catch (err) {
      res.status(500).json({ message: 'Error rating hostel', error: err.message });
    }
  });
  
// Delete a rating (RESTful: userId in URL)
router.delete('/:id/ratings/:userId', async (req, res) => {
  const { id, userId } = req.params;

  try {
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }

    // Remove the user's rating
    hostel.ratings = hostel.ratings.filter(r => r.userId !== userId);

    // Update average rating
    const totalRatings = hostel.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    hostel.averageRating = hostel.ratings.length > 0 ? +(totalRatings / hostel.ratings.length).toFixed(1) : 0;

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting rating', error: err.message });
  }
});
  
// Save a hostel
router.post('/save/:id', async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }
  
    try {
      const hostel = await Hostel.findById(req.params.id);
  
      if (!hostel) {
        return res.status(404).json({ message: 'Hostel not found' });
      }
  
      if (hostel.savedBy.includes(userId)) {
        hostel.savedBy = hostel.savedBy.filter(id => id !== userId); // Remove user ID if it already exists
      } else {
        hostel.savedBy.push(userId); // Add user ID if it doesn't exist
      }
  
      await hostel.save();
  
      res.json(hostel);
    } catch (err) {
      res.status(500).json({ message: 'Error saving hostel', error: err.message });
    }
  });
  
module.exports = router;
