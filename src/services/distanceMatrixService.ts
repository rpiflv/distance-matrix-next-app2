import axios from 'axios';

export class DistanceMatrixService {
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.GOOGLE_DISTANCE_MATRIX_API_KEY || '';
        this.baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    }

    public async getCommuteTimes(origin: string, destinations: string[]): Promise<any> {
        const destinationString = destinations.join('|');
        const url = `${this.baseUrl}?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destinationString)}&key=${this.apiKey}`;

        const response = await axios.get(url);
        return response.data;
    }
}