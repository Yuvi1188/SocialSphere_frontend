import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser } from '../../../store/user-actions';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from "../../layout/loader/Loader"

const SignUp = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const email = form.email.value;
        const fullName = form.fullName.value;
        const username = form.username.value;
        const password = form.password.value;

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Validate password length
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        const userData = {
            email,
            fullName,
            username,
            password,
        };

        dispatch(registerUser(userData))
    .then(() => {
        form.reset();
        navigate('/dob');  // Navigate forward on success
    })
    .catch(() => {
        toast.error("User already exist");
        navigate(-1);  // Navigate back on failure
    });

    };

    return (
        <>
            {loading ? <Loader /> : (
                <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
                    <div className="w-full max-w-xs sm:max-w-sm">
                        <div className="bg-white p-6 sm:p-8 border border-gray-300 rounded">
                            <div className="flex justify-center mb-6">
                                <h1 className='text-xl sm:text-2xl'>SocialSnap</h1>
                            </div>
                            <form ref={formRef} className="space-y-3" onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-gray-400"
                                />
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-gray-400"
                                />
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-gray-400"
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2 text-white bg-blue-500 rounded font-semibold focus:outline-none"
                                >
                                    Sign up
                                </button>
                            </form>
                            <div className="mt-4 text-center text-gray-500 text-xs sm:text-sm">
                                By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                            </div>
                        </div>
                        <div className="bg-white p-3 sm:p-4 border border-gray-300 rounded mt-4 text-center">
                            <p className="text-xs sm:text-sm">
                                Have an account? <NavLink to="/login" className="text-blue-500 font-semibold">Log in</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignUp;
