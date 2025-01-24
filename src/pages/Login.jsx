import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../utils/constants";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [gender, setGender] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/login`, {
                emailId,
                password,
            }, { withCredentials: true });
            dispatch(addUser(res.data));
            navigate('/');
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/signup`, {
                emailId,
                firstName,
                lastName,
                password,
                gender,
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            navigate('/profile');
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center h-full bg-gray-900">
            <div className="card w-96 bg-base-300 bg-opacity-10 backdrop-filter backdrop-blur-md shadow-xl border border-white border-opacity-30">
                <div className="card-body">
                    <h2 className="text-white text-center">
                        {isLoginForm ? "Welcome Back" : "Welcome to Dev Tinder"}
                    </h2>
                    <p className="mb-2 text-gray-400">
                        {isLoginForm ? "Please log in to your account" : "Please signup to get started"}
                    </p>
                    <form onSubmit={isLoginForm ? handleLogin : handleSignup}>
                        {!isLoginForm && (
                            <>
                                <div className="form-control mb-2">
                                    <label className="label">
                                        <span className="label-text text-gray-400">First Name</span>
                                    </label>
                                    <input
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="label">
                                        <span className="label-text text-gray-400">Last Name</span>
                                    </label>
                                    <input
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="label">
                                        <span className="label-text text-gray-400">Gender</span>
                                    </label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="select select-bordered select-success w-full bg-transparent"
                                    >
                                        <option className='bg-gray-800 text-white' value="" disabled>Select your gender</option>
                                        <option className='bg-gray-800 text-white' value="Male">Male</option>
                                        <option className='bg-gray-800 text-white' value="Female">Female</option>
                                    </select>
                                </div>
                            </>
                        )}
                        <div className="form-control mb-2">
                            <label className="label">
                                <span className="label-text text-gray-400">Email</span>
                            </label>
                            <input
                                value={emailId}
                                type="email"
                                onChange={(e) => setEmailId(e.target.value)}
                                className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-control mb-2">
                            <label className="label">
                                <span className="label-text text-gray-400">Password</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <p className="text-red-500 pb-2">{error}</p>
                            <button
                                type="submit"
                                className="btn bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-white w-full border border-white border-opacity-70"
                            >
                                {isLoginForm ? "Login" : "Signup"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-400">
                            {isLoginForm
                                ? "Don't have an account?"
                                : "Already have an account?"}{' '}
                            <span
                                onClick={() => setIsLoginForm(!isLoginForm)}
                                className="text-primary hover:underline cursor-pointer"
                            >
                                {isLoginForm ? "Sign up here" : "Login here"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
