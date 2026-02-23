const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hostel = require('../models/Hostel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hostel = require('../models/Hostel');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('MongoDB connected...');

  const hostelsData = [
    {
      name: 'Sample Hostel A',
      description: 'A sample hostel A for testing.',
      price: 500,
      type: 'Student Residence (AC)',
      imageUrls: ['https://placehold.co/600x400'],
      averageRating: 4.2,
      ratings: [],
      latitude: '1.3000',
      longitude: '103.7800',
      savedBy: [],
      mealPlan: 'Yes - $500/Semester',
      academicProgrammes: 'Yes(Optional)',
      hostelActivities: 'Yes'
    },
    {
      name: 'Sample Hostel B',
      description: 'A sample hostel B for testing.',
      price: 400,
      type: 'House (Non-AC)',
      imageUrls: ['https://placehold.co/600x400'],
      averageRating: 3.8,
      ratings: [],
      latitude: '1.3050',
      longitude: '103.7750',
      savedBy: [],
      mealPlan: 'N/A',
      academicProgrammes: 'No',
      hostelActivities: 'No'
    },
    {
      name: 'Sample Hostel C',
      description: 'A sample hostel C for testing.',
      price: 600,
      type: 'Residential College (AC)',
      imageUrls: ['https://placehold.co/600x400'],
      averageRating: 4.7,
      ratings: [],
      latitude: '1.3070',
      longitude: '103.7720',
      savedBy: [],
      mealPlan: 'Yes - $1200/Semester',
      academicProgrammes: 'Yes(Compulsory)',
      hostelActivities: 'Yes(Compulsory)'
    }
  ];

  try {
    console.log('Clearing existing hostels and inserting sample hostels...');
    await Hostel.deleteMany({});
    const result = await Hostel.insertMany(hostelsData);
    console.log('Hostels inserted:', result.length);
  } catch (err) {
    console.error('Error inserting hostels:', err);
  } finally {
    mongoose.connection.close();
  }
});


