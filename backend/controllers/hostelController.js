const HostelService = require('../services/hostelService');

exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await HostelService.getAllHostels();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHostelById = async (req, res) => {
  try {
    const hostel = await HostelService.getHostelById(req.params.id);
    res.json(hostel);
  } catch (err) {
    const status = err.message === 'Hostel not found' ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

exports.createHostel = async (req, res) => {
  try {
    const newHostel = await HostelService.createHostel(req.body);
    res.status(201).json(newHostel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.rateHostel = async (req, res) => {
  try {
    const hostel = await HostelService.rateHostel(req.params.id, req.body);
    res.json(hostel);
  } catch (err) {
    const badRequestMsgs = ['UserId and rating are required', 'Hostel not found'];
    const status = badRequestMsgs.includes(err.message) ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const hostel = await HostelService.deleteRating(req.params.id, req.params.userId);
    res.json(hostel);
  } catch (err) {
    const status = err.message === 'Hostel not found' ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

exports.toggleSaveHostel = async (req, res) => {
  try {
    const hostel = await HostelService.toggleSaveHostel(req.params.id, req.body.userId);
    res.json(hostel);
  } catch (err) {
    const status = err.message === 'Hostel not found' ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};
