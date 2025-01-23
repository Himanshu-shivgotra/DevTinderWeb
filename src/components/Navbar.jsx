import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
    const user = useSelector((store) => store.user);

    return (
        <div className="navbar bg-gray-800 shadow-md text-white">
            <div className="flex-1">
                <Link to={'/'} className="btn btn-ghost text-2xl font-bold">
                    Dev Tinder 🧑‍💻
                </Link>
            </div>
            <div className="flex-none gap-4">
                {user ? (
                    <>
                        <p className="hidden md:block text-lg font-medium">
                            Welcome, {user.firstName}!
                        </p>
                        <div className="dropdown dropdown-end mx-5">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar hover:bg-gray-700 transition-all"
                            >
                                <div className="w-12 rounded-full border-2 border-gray-300 shadow-sm">
                                    <img
                                        alt="User Photo"
                                        src={user.photoUrl}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
                            >
                                <li>
                                    <Link to={"/profile"} className="hover:bg-gray-200 transition-colors">
                                        Profile
                                        <span className="badge badge-primary">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/settings"} className="hover:bg-gray-200 transition-colors">Settings</Link>
                                </li>
                                <li>
                                    <Link to={"/logout"} className="hover:bg-gray-200 transition-colors">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <button className="btn btn-primary px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                        Sign Up
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
