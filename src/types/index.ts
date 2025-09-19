export interface CommuteRequest {
    origin: string;
    destinations: string[];
}

export interface CommuteResponse {
    destination: string;
    duration: string;
    distance: string;
}

export interface ErrorResponse {
    error: string;
}