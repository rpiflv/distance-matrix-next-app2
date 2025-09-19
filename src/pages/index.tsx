import { useState } from 'react';
import CommuteForm from '../components/CommuteForm';
import { CommuteResponse } from '../types';

const Home = () => {
    const [commuteResults, setCommuteResults] = useState<CommuteResponse[] | null>(null);

    const handleCommuteResults = (results: CommuteResponse[]) => {
        setCommuteResults(results);
    };

    return (
        <div>
            <h1>Commute Time Calculator</h1>
            <CommuteForm onCommuteResults={handleCommuteResults} />
            {commuteResults && (
                <div>
                    <h2>Commute Times</h2>
                    <pre>{JSON.stringify(commuteResults, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Home;