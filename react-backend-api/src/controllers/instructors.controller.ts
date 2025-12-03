import { Request, Response } from 'express';
import { Instructor } from '../models/Instructor';
import { validateInstructor } from '../validation/instructor.schema';

// Get all instructors
export const getInstructors = async (req: Request, res: Response) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching instructors', error });
    }
};

// Get instructor by ID
export const getInstructorById = async (req: Request, res: Response) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.status(200).json(instructor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching instructor', error });
    }
};

// Create a new instructor
export const createInstructor = async (req: Request, res: Response) => {
    const { error } = validateInstructor(req.body);
    if (error) return res.status(400).json({ message: error });

    try {
        const newInstructor = new Instructor(req.body);
        await newInstructor.save();
        res.status(201).json(newInstructor);
    } catch (error) {
        res.status(500).json({ message: 'Error creating instructor', error });
    }
};

// Update an instructor
export const updateInstructor = async (req: Request, res: Response) => {
    const { error } = validateInstructor(req.body);
    if (error) return res.status(400).json({ message: error });

    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInstructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.status(200).json(updatedInstructor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating instructor', error });
    }
};

// Delete an instructor
export const deleteInstructor = async (req: Request, res: Response) => {
    try {
        const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
        if (!deletedInstructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.status(200).json({ message: 'Instructor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting instructor', error });
    }
};