import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../redux/feedSlice';
import UserCard from '../components/userCard';

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const [randomUser, setRandomUser] = useState(null);

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + '/feed', {
                withCredentials: true,
            });
            const fetchedFeed = res?.data || [];
            dispatch(addFeed(fetchedFeed));
            selectRandomUser(fetchedFeed);
        } catch (err) {
            console.log(err);
        }
    };

    const selectRandomUser = (feedArray) => {
        if (feedArray && feedArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * feedArray.length);
            setRandomUser(feedArray[randomIndex]);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    useEffect(() => {
        if (feed && feed.length > 0) {
            selectRandomUser(feed);
        }
    }, [feed]);

    return (
        <div className="flex justify-center items-center min-h-scree">
            {randomUser ? (
                <UserCard user={randomUser} />
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
