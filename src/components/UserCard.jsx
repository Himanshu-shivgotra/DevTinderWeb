import React from 'react';


const UserCard = ({ user }) => {
    const { firstName, lastName, about, age, skills, photoUrl } = user;
    return (
        <div className="card w-96 bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-200 m-4">
            <figure className="px-10 pt-10">
                <img src={photoUrl} alt={`${firstName} ${lastName}`} className="rounded-xl w-48 h-48 object-cover" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <div className="badge bg-blue-500 text-white py-2 px-4 rounded-lg my-2">Age: {age}</div>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                    <strong>Skills:</strong>
                    {skills && skills.map((skill, index) => (
                        <span key={index} className="badge badge-primary badge-lg">{skill}</span>
                    ))}
                </div>
                <p className="text-left my-2"><strong>About:</strong> {about}</p>
                <div className="mt-6 space-x-3">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">Ignore</button>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
