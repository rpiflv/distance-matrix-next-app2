export interface CommuteRequest {
    origin: string;
    destinations: string[];
}

export interface CommuteResponse {
    destination: string;
    duration: string;
    distance: string;
}

// Google Distance Matrix API response structure
export interface GoogleDistanceMatrixResponse {
    status: string;
    origin_addresses: string[];
    destination_addresses: string[];
    rows: {
        elements: {
            status: string;
            duration?: { text: string; value: number };
            distance?: { text: string; value: number };
            duration_in_traffic?: { text: string; value: number };
        }[];
    }[];
}

export interface ErrorResponse {
    error: string;
}