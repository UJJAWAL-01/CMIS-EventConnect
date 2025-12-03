import { Request, Response } from 'express';

export const subscribeToUpdates = (_req: Request, res: Response) => {
    return res.json({ message: 'Subscribed (stub)' });
};

export const unsubscribeFromUpdates = (_req: Request, res: Response) => {
    return res.json({ message: 'Unsubscribed (stub)' });
};

export const sendUpdate = (req: Request, res: Response) => {
    const { message } = req.body;
    console.log('Realtime update:', message);
    return res.json({ message: 'Update sent (stub)' });
};