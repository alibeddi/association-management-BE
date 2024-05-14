import mongoose from 'mongoose';
import { User } from '../database/mongodb/models/user.model';
import { RolesEnum } from '../constants/constants';
import userRepository from '../database/mongodb/repositories/user.repository';

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log('Connected to MongoDB');

    await User.deleteMany({});

    console.log('Existing users deleted successfully');

    const superAdminData = {
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: 'superadminpassword',
      role: RolesEnum.admin,
    };

    const existingSuperAdmin = await userRepository.getOneByQuery({ email: superAdminData.email });

    if (!existingSuperAdmin) {
      await userRepository.create(superAdminData);
      console.log('Default superAdmin seeded successfully.');
    } else {
      console.log('Default superAdmin already exists.');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
