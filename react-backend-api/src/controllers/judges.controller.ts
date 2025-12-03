import { Request, Response } from 'express';
import { Judge } from '../models/Judge';
import { validateJudge } from '../validation/judge.schema';

// Get all judges
export const getAllJudges = async (req: Request, res: Response) => {
    try {
        const judges = await Judge.find();
        res.status(200).json(judges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching judges', error });
    }
};

// Get a judge by ID
export const getJudgeById = async (req: Request, res: Response) => {
    try {
        const judge = await Judge.findById(req.params.id);
        if (!judge) {
            return res.status(404).json({ message: 'Judge not found' });
        }
        res.status(200).json(judge);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching judge', error });
    }
};

// Create a new judge
export const createJudge = async (req: Request, res: Response) => {
    const { error } = validateJudge(req.body);
    if (error) return res.status(400).json({ message: error });

    try {
        const newJudge = new Judge(req.body);
        await newJudge.save();
        res.status(201).json(newJudge);
    } catch (error) {
        res.status(500).json({ message: 'Error creating judge', error });
    }
};

// Update a judge by ID
export const updateJudge = async (req: Request, res: Response) => {
    const { error } = validateJudge(req.body);
    if (error) return res.status(400).json({ message: error });

    try {
        const updatedJudge = await Judge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJudge) {
            return res.status(404).json({ message: 'Judge not found' });
        }
        res.status(200).json(updatedJudge);
    } catch (error) {
        res.status(500).json({ message: 'Error updating judge', error });
    }
};

// Delete a judge by ID
export const deleteJudge = async (req: Request, res: Response) => {
    try {
        const deletedJudge = await Judge.findByIdAndDelete(req.params.id);
        if (!deletedJudge) {
            return res.status(404).json({ message: 'Judge not found' });
        }
        res.status(200).json({ message: 'Judge deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting judge', error });
    }
};