import axios from 'axios';

export class DistanceMatrixService {
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.GOOGLE_DISTANCE_MATRIX_API_KEY || '';
        this.baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    }

    public async getCommuteTimes(origin: string, destinations: string[], departureTime?: Date): Promise<any> {
        const destinationString = destinations.join('|');
        
        // Use provided departure time or current time
        const depTime = departureTime ? Math.floor(departureTime.getTime() / 1000) : Math.floor(Date.now() / 1000);
        
        const url = `${this.baseUrl}?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destinationString)}&mode=transit&departure_time=${depTime}&transit_mode=bus|rail|subway|train&transit_routing_preference=fewer_transfers&language=en&units=metric&key=${this.apiKey}`;

        const response = await axios.get(url);
        return response.data;
    }

    public async getCommuteTimesWithOptions(origin: string, destinations: string[], options?: {
        departureTime?: Date;
        transitMode?: string;
        routingPreference?: 'less_walking' | 'fewer_transfers';
    }): Promise<any> {
        const destinationString = destinations.join('|');
        
        const depTime = options?.departureTime ? 
            Math.floor(options.departureTime.getTime() / 1000) : 
            Math.floor(Date.now() / 1000);
            
        const transitMode = options?.transitMode || 'bus|rail|subway|train';
        const routingPref = options?.routingPreference || 'fewer_transfers';
        
        const url = `${this.baseUrl}?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destinationString)}&mode=transit&departure_time=${depTime}&transit_mode=${transitMode}&transit_routing_preference=${routingPref}&language=en&units=metric&key=${this.apiKey}`;

        const response = await axios.get(url);
        return response.data;
    }
}