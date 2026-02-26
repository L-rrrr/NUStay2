const express = require('express');
const router = express.Router();
const hostelController = require('../controllers/hostelController');

// Get all hostels
router.get('/', hostelController.getAllHostels);

// Get a single hostel by ID
router.get('/:id', hostelController.getHostelById);

// Create a new hostel
router.post('/', hostelController.createHostel);

// Rate a hostel
router.post('/rate-hostel/:id', hostelController.rateHostel);

// Delete a rating (RESTful: userId in URL)
router.delete('/:id/ratings/:userId', hostelController.deleteRating);

// Save a hostel
router.post('/save/:id', hostelController.toggleSaveHostel);

module.exports = router;
