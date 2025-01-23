import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Connections = () => {
    const [connections, setConnections] = useState([]);
    const [error, setError] = useState('');

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connection', { withCredentials: true });
            setConnections(res?.data?.data);
        } catch (err) {
            setError(err.response?.data || 'Failed to fetch connections.');
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (connections.length === 0) {
        return <h3>No connection Found!</h3>
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 text-white">
            <div className="container mx-auto py-10 px-6">
                <h1 className="text-4xl font-bold text-center mb-8">Your Connections</h1>
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {connections.map((connection, index) => (
                        <div
                            key={index}
                            className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-300 transition-transform transform hover:scale-105"
                        >
                            <div className="relative">
                                <img
                                    src={connection.photoUrl || 'https://via.placeholder.com/300'}
                                    alt={`${connection.firstName} ${connection.lastName}`}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="absolute -bottom-8 left-6">
                                    <img
                                        src={connection.photoUrl || 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full border-4 border-white"
                                    />
                                </div>
                            </div>
                            <div className="p-6 pt-12 text-center">
                                <h2 className="text-xl font-semibold">{connection.firstName} {connection.lastName}</h2>
                                <p className="text-sm text-gray-500">{connection.gender}, Age: {connection.age}</p>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Skills</h3>
                                    <div className="flex flex-wrap justify-center mt-2">
                                        {connection.skills?.length ? (
                                            connection.skills.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-yellow-500 text-white rounded-full px-3 py-1 mr-2 mt-2"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-400">No skills mentioned.</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">About</h3>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {connection.about || 'No details provided.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {connections.length === 0 && !error && (
                    <p className="text-center text-gray-300 mt-8">You have no connections yet.</p>
                )}
            </div>
        </div>
    );
};

export default Connections;
