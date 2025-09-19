import { useState } from 'react';
import CommuteForm from '../components/CommuteForm';
import { CommuteResponse } from '../types';

const Home = () => {
    const [commuteResults, setCommuteResults] = useState<CommuteResponse[] | null>(null);

    const handleCommuteResults = (results: CommuteResponse[]) => {
        setCommuteResults(results);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '10px' }}>
                Commute Time Calculator
            </h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                Calculate commute times from one origin to multiple destinations. Upload a CSV file to quickly populate destinations, or enter them manually.
            </p>
            <CommuteForm onCommuteResults={handleCommuteResults} />
            {commuteResults && (
                <div style={{ marginTop: '30px' }}>
                    <h2 style={{ color: '#333', borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>
                        Commute Times Results
                    </h2>
                    <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        padding: '20px', 
                        borderRadius: '8px', 
                        marginTop: '15px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        overflow: 'auto'
                    }}>
                        <pre>{JSON.stringify(commuteResults, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;