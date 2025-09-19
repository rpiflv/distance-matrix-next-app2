import React, { useState } from 'react';
import { CommuteResponse } from '../types';

interface CommuteFormProps {
    onCommuteResults: (results: CommuteResponse[]) => void;
}

const CommuteForm: React.FC<CommuteFormProps> = ({ onCommuteResults }) => {
    const [origin, setOrigin] = useState('');
    const [destinations, setDestinations] = useState<string[]>(['']);
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [error, setError] = useState('');

    const handleDestinationChange = (index: number, value: string) => {
        const newDestinations = [...destinations];
        newDestinations[index] = value;
        setDestinations(newDestinations);
    };

    const addDestination = () => {
        setDestinations([...destinations, '']);
    };

    const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCsvFile(file);
            parseCsvFile(file);
        }
    };

    const parseCsvFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n').filter(line => line.trim() !== '');
            
            // Skip header if it looks like a header (contains common header words)
            const headerIndicators = ['destination', 'address', 'location', 'place'];
            const firstLine = lines[0]?.toLowerCase() || '';
            const hasHeader = headerIndicators.some(indicator => firstLine.includes(indicator));
            
            const destinationList = hasHeader ? lines.slice(1) : lines;
            const cleanDestinations = destinationList
                .map(line => line.split(',')[0].trim()) // Take first column and trim whitespace
                .filter(dest => dest !== ''); // Remove empty lines
            
            // Add the CSV destinations to the input fields, ensuring we have at least one empty field at the end
            setDestinations([...cleanDestinations, '']);
        };
        reader.readAsText(file);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        if (!origin) {
            setError('Please provide a valid origin.');
            return;
        }

        if (destinations.length === 0 || destinations.every(dest => !dest)) {
            setError('Please provide at least one destination address.');
            return;
        }

        // Filter out empty destinations
        const validDestinations = destinations.filter(dest => dest.trim() !== '');

        try {
            const response = await fetch('/api/commute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ origin, destinations: validDestinations }),
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
        <div style={{ padding: '20px', maxWidth: '600px' }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Origin Address:
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            placeholder="Enter your starting location"
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Quick Upload - CSV File (Optional):
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleCsvFileChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                    <small style={{ color: '#666' }}>
                        Upload a CSV file to automatically populate the destination fields below. CSV should have destinations in the first column.
                    </small>
                    {csvFile && (
                        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
                            <strong>✓ Loaded {destinations.filter(d => d.trim()).length} destinations from: {csvFile.name}</strong>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ fontWeight: 'bold' }}>Destination Addresses:</label>
                        <button 
                            type="button" 
                            onClick={addDestination}
                            style={{ 
                                padding: '6px 12px', 
                                backgroundColor: '#f0f0f0', 
                                border: '1px solid #ccc', 
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            + Add Destination
                        </button>
                    </div>
                    {destinations.map((destination, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => handleDestinationChange(index, e.target.value)}
                                placeholder={`Enter destination ${index + 1} address`}
                                style={{ 
                                    width: '100%', 
                                    padding: '8px', 
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                    ))}
                </div>

                <button 
                    type="submit"
                    style={{ 
                        padding: '12px 24px', 
                        backgroundColor: '#0070f3', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Calculate Commute Times
                </button>
            </form>
            {error && (
                <p style={{ 
                    color: 'red', 
                    marginTop: '10px', 
                    padding: '10px', 
                    backgroundColor: '#ffebee', 
                    borderRadius: '4px' 
                }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default CommuteForm;