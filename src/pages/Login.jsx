import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../utils/constants"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailId, setEmailId] = useState("himmu@gmail.com");
    const [password, setPassword] = useState("Himmu@123");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password,
            }, { withCredentials: true })
            dispatch(addUser(res.data))
            navigate('/')
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong")
        }
    }

    return (
        <div className="flex items-center justify-center h-full bg-gray-900 ">
            <div className="card w-96 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md shadow-xl border border-white border-opacity-30">
                <div className="card-body">
                    <h2 className="text-white text-center">Welcome Back</h2>
                    <p className="mb-4 text-gray-400">Please log in to your account</p>
                    <form>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-gray-400">Email</span>
                            </label>
                            <input
                                value={emailId}
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmailId(e.target.value)}
                                className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-gray-400">Password</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <p className='text-red-500 pb-2'>{error}</p>
                            <button onClick={handleLogin} className="btn bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-white w-full border border-white border-opacity-70">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <a href="#" className="text-primary hover:underline">
                                Sign up here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
