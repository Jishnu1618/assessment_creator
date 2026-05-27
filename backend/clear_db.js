import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log('Target URI:', MONGODB_URI);

async function clearDatabase() {
  console.log('Connecting to MongoDB Atlas...');
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');
    
    // Check collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));
    
    // Delete all assignments
    const countBefore = await mongoose.connection.db.collection('assignments').countDocuments();
    console.log(`Found ${countBefore} assignments in the database.`);
    
    if (countBefore > 0) {
      const result = await mongoose.connection.db.collection('assignments').deleteMany({});
      console.log(`Deleted ${result.deletedCount} assignments. Database is now clean!`);
    } else {
      console.log('Database was already clean.');
    }
    
    await mongoose.disconnect();
    console.log('Disconnected.');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

clearDatabase();
