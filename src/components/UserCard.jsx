import axios from 'axios';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../redux/feedSlice';

const UserCard = ({ user, onSwipeComplete }) => {
    const dispatch = useDispatch();
    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState(null);

    if (!user) return null;

    const { _id, firstName, lastName, about, age, skills, photoUrl, gender } = user;

    // Common swipe handler for both gestures and buttons
    const handleSwipe = (direction) => {
        setSwipeDirection(direction);
        setIsSwiping(true);
        setTimeout(() => {
            handleSendRequest(direction === 'right' ? 'interested' : 'ignored', _id);
            onSwipeComplete?.(); // Optional: Notify parent component
        }, 300); // Match animation duration
    };

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(
                `${BASE_URL}/request/send/${status}/${userId}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId)); // Remove user from Redux store
        } catch (err) {
            console.error('Error sending request:', err);
        }
    };

    // Swipe handlers for touch/mouse
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        trackMouse: true,
    });

    // Animation variants
    const cardVariants = {
        hidden: (direction) => ({
            x: direction === 'right' ? 500 : -500,
            opacity: 0,
            rotate: direction === 'right' ? 30 : -30,
            transition: { duration: 0.3 },
        }),
        visible: {
            x: 0,
            opacity: 1,
            rotate: 0,
            transition: { duration: 0.3 },
        },
        exit: (direction) => ({
            x: direction === 'right' ? 500 : -500,
            opacity: 0,
            rotate: direction === 'right' ? 30 : -30,
            transition: { duration: 0.3 },
        }),
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={_id}
                {...swipeHandlers}
                className="card w-96 bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-200 m-4"
                variants={cardVariants}
                initial="visible"
                animate={isSwiping ? 'hidden' : 'visible'}
                exit="exit"
                custom={swipeDirection}
            >
                {/* Instructional Text */}
                <div className="absolute top-4 left-0 right-0 text-center text-gray-500 text-sm">
                    Swipe left to ignore or right to connect!
                </div>

                {/* Card Content */}
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
                            onClick={() => handleSwipe('left')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            Ignore
                        </button>
                        <button
                            onClick={() => handleSwipe('right')}
                            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            Interested
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UserCard;