import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../redux/requestSlice';

const ConnectionRequests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const [toast, setToast] = useState(false);

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/requests/recieved', { withCredentials: true });
            dispatch(addRequest(res?.data?.data));
        } catch (error) {
            console.log(error);
        }
    };

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + '/request/review/' + status + "/" + _id,
                {}, { withCredentials: true });
            setToast({ type: status === 'accepted' ? 'success' : 'error', message: `Request ${status}ed successfully!` });
            dispatch(removeRequest(_id))

        } catch (error) {
            console.log(error);
            setToast({ type: 'error', message: 'Something went wrong!' });
        }
    }
    setTimeout(() => {
        setToast(false)
    }, 3000);

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!requests || requests.length === 0) {
        return <h3 className="text-center text-gray-400 mt-8">No Requests Found!</h3>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-6">
            <div className="container lg:w-1/2 mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Connection Requests</h1>
                <div className="space-y-6">
                    {requests.map((request) => (
                        <div
                            key={request._id}
                            className="flex items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={request.fromUserId?.photoUrl || 'https://via.placeholder.com/50'}
                                    alt={request.fromUserId?.firstName || 'User'}
                                    className="w-16 h-16 rounded-full border-2 border-gray-600"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-100">
                                        {request.fromUserId?.firstName || 'Unknown User'}{' '}
                                        {request.fromUserId?.lastName || ''}
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        Age: {request.fromUserId?.age || 'N/A'} | Gender:{' '}
                                        {request.fromUserId?.gender || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 px-6">
                                <p className="text-sm text-gray-400">
                                    {request.fromUserId?.about || 'No details provided.'}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button onClick={() => reviewRequest("rejected", request._id)} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
                                    Decline
                                </button>
                                <button onClick={() => reviewRequest("accepted", request._id)} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
                                    Accept
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast toast-top toast-center`}>
                    <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectionRequests;
