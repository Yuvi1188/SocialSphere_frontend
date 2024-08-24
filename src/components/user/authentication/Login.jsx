import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../store/user-actions';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../layout/loader/Loader';

const Login = () => {
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email && password) {
            const result = await dispatch(loginUser(email, password));

            if (result) {
                navigate('/');
            } else {
                toast.error("Invalid information");
            }
        } else {
            toast.error("Please fill in all fields.");
        }
    };

    return (
        <>{loading ? (<Loader />) : (
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
                <div className="w-full max-w-xs sm:max-w-sm">
                    <div className="bg-white p-8 sm:p-10 border border-gray-300 rounded-md">
                        <div className="flex justify-center mb-6">
                            <h1 className='text-xl sm:text-2xl'>SocialSphere</h1>
                        </div>
                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="email or username"
                                ref={emailRef}
                                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-sm bg-gray-50 focus:outline-none focus:border-gray-400"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                ref={passwordRef}
                                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-sm bg-gray-50 focus:outline-none focus:border-gray-400"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-blue-500 rounded-sm font-semibold focus:outline-none"
                            >
                                Log In
                            </button>
                        </form>
                        <div className="flex items-center my-4">
                            <hr className="w-full border-gray-300" />
                            <span className="mx-4 text-gray-500 text-xs sm:text-sm font-semibold">OR</span>
                            <hr className="w-full border-gray-300" />
                        </div>

                        <div className="flex justify-center mt-4">
                            <a href="#" className="text-blue-500 text-xs">Forgot password?</a>
                        </div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 border border-gray-300 rounded-md mt-4 text-center">
                        <p className="text-xs sm:text-sm">
                            Don't have an account? <NavLink to="/signup" className="text-blue-500 font-semibold">Sign up</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        )}</>
    );
};

export default Login;
