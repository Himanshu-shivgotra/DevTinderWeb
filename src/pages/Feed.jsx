import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../redux/feedSlice';
import { useEffect } from 'react';
import UserCard from '../components/userCard';

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + '/feed', {
                withCredentials: true,
            });
            dispatch(addFeed(res?.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            {feed && (
                <UserCard user={feed[1]} />
            )}
        </div>
    );
};

export default Feed;
