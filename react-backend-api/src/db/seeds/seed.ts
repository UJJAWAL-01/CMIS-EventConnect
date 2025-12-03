import { User } from '../../models/User';
import { Student } from '../../models/Student';
import { Instructor } from '../../models/Instructor';
import { Judge } from '../../models/Judge';
import { Role } from '../../models/Role';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
    try {
        const existingUsers = await User.estimatedDocumentCount();
        if (existingUsers > 0 && process.env.FORCE_SEED !== 'true') {
            console.log('Seed skipped: data already exists. Set FORCE_SEED=true to reseed.');
            return;
        }

        await Promise.all([
            Student.deleteMany({}),
            Instructor.deleteMany({}),
            Judge.deleteMany({}),
            Role.deleteMany({}),
            User.deleteMany({})
        ]);

        const roles = [
            { name: 'student', permissions: ['read:students'] },
            { name: 'instructor', permissions: ['read:students', 'write:students'] },
            { name: 'judge', permissions: ['read:students'] },
            { name: 'admin', permissions: ['admin:all'] }
        ];
        await Role.insertMany(roles);

        const password = 'Passw0rd!';
        const hash = await bcrypt.hash(password, 10);

        // Admin (email as username)
        const adminUser = await User.create({ username: 'admin@cmis.local', password: hash, role: 'admin' });

        // Students
        const majors = ['Computer Science', 'Information Systems', 'Data Science', 'Business Analytics', 'Cybersecurity'];
        const studentUsers = await User.insertMany(
            Array.from({ length: 100 }).map((_, i) => ({
                username: `student${i + 1}@cmis.local`,
                password: hash,
                role: 'student'
            }))
        );
        await Student.insertMany(
            studentUsers.map((u, idx) => ({
                user: u._id,
                major: majors[idx % majors.length],
                year: (idx % 4) + 1,
                gpa: +(2 + (idx % 21) * 0.1).toFixed(2) > 4 ? 4 : +(2 + (idx % 21) * 0.1).toFixed(2)
            }))
        );

        // Instructors
        const instructorUsers = await User.insertMany(
            Array.from({ length: 20 }).map((_, i) => ({
                username: `instructor${i + 1}@cmis.local`,
                password: hash,
                role: 'instructor'
            }))
        );
        await Instructor.insertMany(
            instructorUsers.map((u, idx) => ({
                user: u._id,
                expertise: ['Databases', 'Web Dev', 'AI', 'Cloud'][idx % 4],
                bio: `Instructor ${idx + 1} with expertise in teaching and mentoring.`,
                courses: [`COURSE-${(idx % 5) + 1}`, `COURSE-${(idx % 7) + 1}`]
            }))
        );

        // Judges
        const judgeUsers = await User.insertMany(
            Array.from({ length: 20 }).map((_, i) => ({
                username: `judge${i + 1}@cmis.local`,
                password: hash,
                role: 'judge'
            }))
        );
        await Judge.insertMany(
            judgeUsers.map((u, idx) => ({
                user: u._id,
                expertise: ['Tech', 'Business', 'Design'].slice(0, (idx % 3) + 1),
                rating: 3 + (idx % 3)
            }))
        );

        console.log('Database seeded successfully');
        console.log('Sample credentials (email as username):');
        console.log('- Admin: admin@cmis.local / Passw0rd!');
        console.log('- Student: student1@cmis.local / Passw0rd!');
        console.log('- Instructor: instructor1@cmis.local / Passw0rd!');
        console.log('- Judge: judge1@cmis.local / Passw0rd!');
    } catch (e) {
        console.error('Seeding error', e);
    }
};