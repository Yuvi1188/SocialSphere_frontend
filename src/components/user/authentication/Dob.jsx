import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dobVerify,sendOtp } from '../../../store/user-actions';
import { toast } from "react-toastify";
import Loader from '../../layout/loader/Loader';

const Dob = () => {
    const { loading,user } = useSelector((store) => store.user);
    const email = user.email;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dayRef = useRef();
    const monthRef = useRef();
    const yearRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const day = dayRef.current.value;
        const month = monthRef.current.value;
        const year = yearRef.current.value;
        console.log(`Date of Birth: ${day}-${month}-${year}`);
        const isEligible = await dispatch(dobVerify(day, month, year));
        if (isEligible) {
           const res =  await dispatch(sendOtp(email)); 
           if(res){
            navigate('/otp');
           }
           else{
            navigate('/signup');
           }
        } else {
            toast.error("You are not eligible");
            navigate('/signup');
        }
    };

    return (
        <>{loading ? <Loader /> : (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Enter Your Date of Birth</h2>
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Day"
                                ref={dayRef}
                                className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength="2"
                            />
                            <input
                                type="text"
                                placeholder="Month"
                                ref={monthRef}
                                className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength="2"
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                ref={yearRef}
                                className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength="4"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        )}</>
    );
}

export default Dob;
