import { NextApiRequest, NextApiResponse } from 'next';
import { DistanceMatrixService } from '../../services/distanceMatrixService';

const distanceMatrixService = new DistanceMatrixService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed. Please use POST.' });
        return;
    }

    const { origin, destinations } = req.body;

    if (!origin || !destinations || !Array.isArray(destinations)) {
        res.status(400).json({ error: 'Invalid request format. Please provide an origin and an array of destinations.' });
        return;
    }

    try {
        const commuteTimes = await distanceMatrixService.getCommuteTimes(origin, destinations);
        res.status(200).json(commuteTimes);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching commute times.' });
    }
}