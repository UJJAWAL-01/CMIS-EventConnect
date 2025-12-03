import { Request, Response } from 'express';
import { Student } from '../models/Student';
import { validateStudent } from '../validation/student.schema';

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

// Get a student by ID
export const getStudentById = async (req: Request, res: Response) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
};

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).json({ message: error });

    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
};

// Update a student by ID
export const updateStudent = async (req: Request, res: Response) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).json({ message: error });

    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};

// Delete a student by ID
export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};