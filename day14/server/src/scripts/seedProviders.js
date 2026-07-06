import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ServiceProvider from '../models/ServiceProvider.js';
import User from '../models/User.js';

dotenv.config();

const seedProviders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Find multiple users to associate as providers
    const users = await User.find({}).limit(5);

    if (users.length === 0) {
      console.log('❌ No users found. Please create users first.');
      process.exit(1);
    }

    // Clear existing providers
    await ServiceProvider.deleteMany({});
    console.log('🗑️ Cleared existing providers');

    const sampleProviders = [
      {
        userId: users[0]._id,
        serviceType: 'Plumbing',
        specialization: 'Pipe Installation & Repair',
        experience: 8,
        description: 'Expert plumber with 8+ years experience',
        hourlyRate: 800,
        verified: true,
        location: { lat: 27.7172, lng: 85.3240, address: 'Kathmandu, Nepal' },
        isActive: true,
      },
      {
        userId: users[1]?._id || users[0]._id,
        serviceType: 'Electrician',
        specialization: 'Wiring & Electrical Repairs',
        experience: 5,
        description: 'Licensed electrician with 5 years experience',
        hourlyRate: 700,
        verified: true,
        location: { lat: 27.7000, lng: 85.3300, address: 'Lalitpur, Nepal' },
        isActive: true,
      },
      {
        userId: users[2]?._id || users[0]._id,
        serviceType: 'Cleaning',
        specialization: 'Home & Office Cleaning',
        experience: 4,
        description: 'Professional cleaning services',
        hourlyRate: 500,
        verified: false,
        location: { lat: 27.7300, lng: 85.3100, address: 'Bhaktapur, Nepal' },
        isActive: true,
      },
      {
        userId: users[3]?._id || users[0]._id,
        serviceType: 'Cooking',
        specialization: 'Nepali & Continental Cuisine',
        experience: 6,
        description: 'Experienced cook for events and daily meals',
        hourlyRate: 600,
        verified: true,
        location: { lat: 27.6800, lng: 85.3400, address: 'Kirtipur, Nepal' },
        isActive: true,
      },
      {
        userId: users[4]?._id || users[0]._id,
        serviceType: 'Carpenter',
        specialization: 'Furniture & Woodwork',
        experience: 7,
        description: 'Expert carpenter with 7+ years experience',
        hourlyRate: 750,
        verified: true,
        location: { lat: 27.7100, lng: 85.3150, address: 'Kathmandu, Nepal' },
        isActive: true,
      },
    ];

    await ServiceProvider.insertMany(sampleProviders);

    console.log(`✅ ${sampleProviders.length} sample providers seeded successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding providers:', error);
    process.exit(1);
  }
};

seedProviders();