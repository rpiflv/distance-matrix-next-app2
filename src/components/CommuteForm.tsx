import React, { useState } from 'react';
import { CommuteResponse } from '../types';

interface CommuteFormProps {
    onCommuteResults: (results: CommuteResponse[]) => void;
}

const CommuteForm: React.FC<CommuteFormProps> = ({ onCommuteResults }) => {
    const [origin, setOrigin] = useState('');
    const [destinations, setDestinations] = useState<string[]>(['']);
    const [error, setError] = useState('');

    const handleDestinationChange = (index: number, value: string) => {
        const newDestinations = [...destinations];
        newDestinations[index] = value;
        setDestinations(newDestinations);
    };

    const addDestination = () => {
        setDestinations([...destinations, '']);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        if (!origin || destinations.some(dest => !dest)) {
            setError('Please provide a valid origin and all destinations.');
            return;
        }

        try {
            const response = await fetch('/api/commute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ origin, destinations }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            onCommuteResults(data);
        } catch (error) {
            setError('An error occurred while fetching commute times.');
        }
    };

    return (
        <div>
            <h1>Commute Time Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Origin:
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                        />
                    </label>
                </div>
                {destinations.map((destination, index) => (
                    <div key={index}>
                        <label>
                            Destination {index + 1}:
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => handleDestinationChange(index, e.target.value)}
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={addDestination}>Add Destination</button>
                <button type="submit">Calculate Commute Times</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CommuteForm;