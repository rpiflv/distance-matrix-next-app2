import { useState } from 'react';
import CommuteForm from '../components/CommuteForm';
import { GoogleDistanceMatrixResponse } from '../types';

const Home = () => {
    const [commuteResults, setCommuteResults] = useState<GoogleDistanceMatrixResponse | null>(null);

    const handleCommuteResults = (results: GoogleDistanceMatrixResponse) => {
        setCommuteResults(results);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '10px' }}>
                Public Transit Commute Calculator
            </h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                Calculate public transit commute times (bus, train, subway) from one origin to multiple destinations. Upload a CSV file to quickly populate destinations, or enter them manually.
            </p>
            <CommuteForm onCommuteResults={handleCommuteResults} />
            {commuteResults && (
                <div style={{ marginTop: '30px' }}>
                    <h2 style={{ color: '#333', borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>
                        🚌 Public Transit Commute Times
                    </h2>
                    <div style={{ marginTop: '15px' }}>
                        {commuteResults.rows && commuteResults.rows[0] && commuteResults.rows[0].elements.map((element: any, index: number) => {
                            const destination = commuteResults.destination_addresses[index];
                            const status = element.status;
                            
                            return (
                                <div 
                                    key={index} 
                                    style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        padding: '15px', 
                                        marginBottom: '10px',
                                        backgroundColor: status === 'OK' ? '#f0f8ff' : '#fff5f5',
                                        border: `1px solid ${status === 'OK' ? '#d0e7ff' : '#ffcdd2'}`,
                                        borderRadius: '8px'
                                    }}
                                >
                                    <div style={{ flex: 1, paddingRight: '15px' }}>
                                        <div style={{ 
                                            fontWeight: 'bold', 
                                            color: '#333',
                                            marginBottom: '5px'
                                        }}>
                                            📍 {destination}
                                        </div>
                                        {status === 'OK' && element.distance && (
                                            <div style={{ 
                                                fontSize: '14px', 
                                                color: '#666'
                                            }}>
                                                Distance: {element.distance.text}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ 
                                        textAlign: 'right',
                                        minWidth: '120px'
                                    }}>
                                        {status === 'OK' ? (
                                            <div>
                                                <div style={{ 
                                                    fontSize: '18px', 
                                                    fontWeight: 'bold',
                                                    color: '#0070f3'
                                                }}>
                                                    🕒 {element.duration.text}
                                                </div>
                                                {element.duration_in_traffic && (
                                                    <div style={{ 
                                                        fontSize: '12px', 
                                                        color: '#666',
                                                        marginTop: '2px'
                                                    }}>
                                                        In traffic: {element.duration_in_traffic.text}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div style={{ 
                                                color: '#d32f2f',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}>
                                                ❌ {status === 'ZERO_RESULTS' ? 'No route found' : 'Unable to calculate'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Show raw data in a collapsible section for debugging */}
                    <details style={{ marginTop: '20px' }}>
                        <summary style={{ 
                            cursor: 'pointer', 
                            color: '#666', 
                            fontSize: '14px',
                            padding: '10px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '4px'
                        }}>
                            🔍 Show Raw API Response (for debugging)
                        </summary>
                        <div style={{ 
                            backgroundColor: '#f8f9fa', 
                            padding: '20px', 
                            borderRadius: '8px', 
                            marginTop: '10px',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            overflow: 'auto',
                            maxHeight: '300px'
                        }}>
                            <pre>{JSON.stringify(commuteResults, null, 2)}</pre>
                        </div>
                    </details>
                </div>
            )}
        </div>
    );
};

export default Home;