import React, { useState } from 'react'
import UserCard from './userCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();


    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                firstName, lastName, photoUrl, age, gender, skills, about
            }, { withCredentials: true },)
            dispatch(addUser(res?.data?.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
        } catch (err) {
            setError(err.response.data || "something went wrong");
        }
    };
    return (
        <>
            <div className='flex justify-center mx-10'>
                <div className="flex items-center justify-center h-full bg-gray-900 my-6">
                    <div className="card w-96 bg-base-300  backdrop-filter backdrop-blur-md shadow-xl border border-white border-opacity-30">
                        <div className="card-body">
                            <h2 className="text-white text-center">Edit Profile</h2>
                            <form>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text text-gray-400">First Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text text-gray-400">Last Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text text-gray-400">Photo Url</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text text-gray-400">Age</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={age}
                                        min={16}
                                        max={120}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text text-gray-400">About</span>
                                    </label>
                                    <textarea
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text text-gray-400">Skills</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        className="input input-bordered input-success w-full bg-transparent text-white placeholder-gray-500"
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <p className="text-red-500 pb-2">{error}</p>
                                    <button onClick={handleSave} className="btn bg-black bg-opacity-50 backdrop-filter backdrop-blur-md text-white w-full border border-white border-opacity-20 hover:bg-gray-800">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, about, age, skills, photoUrl, gender }} />
            </div>
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditProfile