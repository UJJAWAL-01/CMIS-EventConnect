export const students = [
  {
    username: "student1",
    password: "password123",
    role: "student",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    enrolledCourses: ["course1", "course2"]
  },
  {
    username: "student2",
    password: "password123",
    role: "student",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    enrolledCourses: ["course3"]
  }
];

export const instructors = [
  {
    username: "instructor1",
    password: "password123",
    role: "instructor",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    coursesTeaching: ["course1"]
  },
  {
    username: "instructor2",
    password: "password123",
    role: "instructor",
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    coursesTeaching: ["course2", "course3"]
  }
];

export const judges = [
  {
    username: "judge1",
    password: "password123",
    role: "judge",
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.davis@example.com"
  },
  {
    username: "judge2",
    password: "password123",
    role: "judge",
    firstName: "Diana",
    lastName: "Evans",
    email: "diana.evans@example.com"
  }
];

export const admin = {
  username: "admin",
  password: "admin123",
  role: "admin",
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com"
};

export const roles = [
  { name: 'student', permissions: ['read:students'] },
  { name: 'instructor', permissions: ['read:students','write:students'] },
  { name: 'judge', permissions: ['read:students'] },
  { name: 'admin', permissions: ['admin:all'] }
];

export const users = [admin];

export default { roles, users, students, instructors, judges };