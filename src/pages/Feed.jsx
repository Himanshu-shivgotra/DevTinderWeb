import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../redux/feedSlice';
import UserCard from '../components/UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const [randomUser, setRandomUser] = useState(null);

    // Fetch feed data
    const getFeed = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
            const fetchedFeed = res?.data || [];
            dispatch(addFeed(fetchedFeed));
            selectRandomUser(fetchedFeed);
        } catch (err) {
            console.error(err);
        }
    };

    // Select a random user
    const selectRandomUser = (feedArray) => {
        if (feedArray?.length > 0) {
            const randomIndex = Math.floor(Math.random() * feedArray.length);
            setRandomUser(feedArray[randomIndex]);
        } else {
            setRandomUser(null);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    // Update random user when feed changes
    useEffect(() => {
        selectRandomUser(feed);
    }, [feed]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            {randomUser ? (
                <UserCard
                    key={randomUser._id} // Force re-render on user change
                    user={randomUser}
                />
            ) : (
                <div className="text-gray-500 text-center">
                    <h2 className="text-xl font-semibold">No New Users found!</h2>
                    <p>Please check back later!</p>
                </div>
            )}
        </div>
    );
};

export default Feed;