import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../redux/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    if (!user) return null;

    const { _id, firstName, lastName, about, age, skills, photoUrl, gender } = user;

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/request/send/${status}/${userId}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.error('Error sending request:', err);
        }
    };

    return (
        <div className="card w-96 bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-200 m-4">
            <figure className="px-10 pt-10">
                <img
                    src={photoUrl || 'https://via.placeholder.com/150'}
                    alt={`${firstName || 'Unknown'} ${lastName || ''}`}
                    className="rounded-xl w-48 h-48 object-cover"
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">
                    {firstName || 'Unknown'} {lastName || ''}
                </h2>
                <div className="badge bg-blue-500 text-white py-2 px-4 rounded-lg my-2">
                    Age: {age || 'N/A'}, {gender || 'N/A'}
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                    <strong>Skills:</strong>
                    {Array.isArray(skills) && skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <span key={index} className="badge badge-primary badge-lg">
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span>No skills listed</span>
                    )}
                </div>
                <p className="text-left my-2">
                    <strong>About:</strong> {about || 'No description provided.'}
                </p>
                <div className="mt-6 space-x-3">
                    <button
                        onClick={() => handleSendRequest('ignored', _id)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Ignore
                    </button>
                    <button
                        onClick={() => handleSendRequest('interested', _id)}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
