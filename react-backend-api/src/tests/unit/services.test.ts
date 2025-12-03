import { userService } from '../../services/user.service';
import { studentService } from '../../services/student.service';
import { instructorService } from '../../services/instructor.service';
import { judgeService } from '../../services/judge.service';
import { Role } from '../../models/Role';

describe('Service Tests', () => {
    describe('User Service', () => {
        it('should fetch user by ID', async () => {
            const userId = 'someUserId';
            const user = await userService.getUserById(userId);
            expect(user).toBeDefined();
            expect(user.id).toEqual(userId);
        });

        // Additional user service tests...
    });

    describe('Student Service', () => {
        it('should create a new student', async () => {
            const studentData = { name: 'John Doe', email: 'john@example.com', role: Role.STUDENT };
            const student = await studentService.createStudent(studentData);
            expect(student).toBeDefined();
            expect(student.name).toEqual(studentData.name);
        });

        // Additional student service tests...
    });

    describe('Instructor Service', () => {
        it('should fetch all instructors', async () => {
            const instructors = await instructorService.getAllInstructors();
            expect(instructors).toBeInstanceOf(Array);
        });

        // Additional instructor service tests...
    });

    describe('Judge Service', () => {
        it('should fetch judge by ID', async () => {
            const judgeId = 'someJudgeId';
            const judge = await judgeService.getJudgeById(judgeId);
            expect(judge).toBeDefined();
            expect(judge.id).toEqual(judgeId);
        });

        // Additional judge service tests...
    });
});