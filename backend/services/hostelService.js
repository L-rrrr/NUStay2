const Hostel = require('../models/Hostel');

async function getAllHostels() {
  return await Hostel.find();
}

async function getHostelById(id) {
  const hostel = await Hostel.findById(id);
  if (!hostel) throw new Error('Hostel not found');
  return hostel;
}

async function createHostel(data) {
  const hostel = new Hostel({
    name: data.name,
    description: data.description,
    price: data.price,
    type: data.type,
    imageUrls: data.imageUrl,
    averageRating: data.averageRating,
    ratings: data.ratings,
    latitude: data.latitude,
    longitude: data.longitude
  });
  return await hostel.save();
}

async function rateHostel(id, { userId, rating }) {
  if (!userId || rating === undefined) {
    throw new Error('UserId and rating are required');
  }

  const hostel = await Hostel.findById(id);
  if (!hostel) throw new Error('Hostel not found');

  const existingRating = hostel.ratings.find(r => r.userId === userId);
  if (existingRating) {
    existingRating.rating = rating;
  } else {
    hostel.ratings.push({ userId, rating });
  }

  const totalRatings = hostel.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  hostel.averageRating = Number((totalRatings / hostel.ratings.length).toFixed(1));

  await hostel.save();
  return hostel;
}

async function deleteRating(id, userId) {
  const hostel = await Hostel.findById(id);
  if (!hostel) throw new Error('Hostel not found');

  hostel.ratings = hostel.ratings.filter(r => r.userId !== userId);

  const totalRatings = hostel.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  hostel.averageRating = hostel.ratings.length > 0 ? Number((totalRatings / hostel.ratings.length).toFixed(1)) : 0;

  await hostel.save();
  return hostel;
}

async function toggleSaveHostel(id, userId) {
  if (!userId) throw new Error('UserId is required');
  const hostel = await Hostel.findById(id);
  if (!hostel) throw new Error('Hostel not found');

  if (hostel.savedBy.includes(userId)) {
    hostel.savedBy = hostel.savedBy.filter(idc => idc !== userId);
  } else {
    hostel.savedBy.push(userId);
  }

  await hostel.save();
  return hostel;
}

module.exports = {
  getAllHostels,
  getHostelById,
  createHostel,
  rateHostel,
  deleteRating,
  toggleSaveHostel
};
