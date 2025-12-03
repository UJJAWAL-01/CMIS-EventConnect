import { User } from '../models/User';
import { Student } from '../models/Student';
import { Instructor } from '../models/Instructor';
import { Judge } from '../models/Judge';
import { Role } from '../models/Role';
import testData from '../db/seeds/test-data';

export const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Student.deleteMany({});
        await Instructor.deleteMany({});
        await Judge.deleteMany({});
        await Role.deleteMany({});

        // Create roles
        const roles = await Role.insertMany(testData.roles);

        // Create users
        const users = await User.insertMany(testData.users);

        // Create students
        const students = await Student.insertMany(testData.students);

        // Create instructors
        const instructors = await Instructor.insertMany(testData.instructors);

        // Create judges
        const judges = await Judge.insertMany(testData.judges);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};