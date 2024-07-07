import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '../../../store/user-actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../layout/loader/Loader';

const ConfirmationCode = () => {
    const dispatch = useDispatch();
    const { user, buttonLoading, loading } = useSelector(state => state.user); // Destructure buttonLoading from user state
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (otpSent) {
            // If OTP has been sent before, change the button text to "Resend OTP"
            document.getElementById('resend-button').innerText = 'Resend OTP';
        }
    }, [otpSent]);

    const handleSendOrResendOtp = () => {
        dispatch(sendOtp(user.email));
        setOtpSent(true);
    };

    const handleChange = (e, index) => {
        const newCode = [...code];
        newCode[index] = e.target.value;
        setCode(newCode);

        if (e.target.value.length === 1 && index < 5) {
            document.getElementById(`code-${index + 1}`).focus();
        }
    };

    const handleVerify = () => {
        const otp = code.join('');
        dispatch(verifyOtp(otp, user))
            .then((isValid) => {
                if (isValid) {
                    navigate('/');
                } else {
                    toast.error('Invalid OTP');
                    setCode(['', '', '', '', '', '']);
                    document.getElementById('code-0').focus();
                }
            })
            .catch((error) => {
                console.error('Error verifying OTP:', error);
                toast.error('Failed to verify OTP. Please try again.');
            });
    };

    return (
        <>
            {loading ? <Loader /> : (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="mb-6 text-2xl font-semibold">Enter Confirmation Code</h2>
                <p className="mb-4">Confirmation code sent to: <strong>{user.email}</strong></p>
                <div className="flex space-x-2">
                    {code.map((num, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength="1"
                            value={num}
                            onChange={(e) => handleChange(e, index)}
                            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <button onClick={handleVerify} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
                    {buttonLoading ? (
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Verifying...
                        </div>
                    ) : (
                        'Verify'
                    )}
                </button>
                <button onClick={handleSendOrResendOtp} id="resend-button" className="px-4 py-2 mt-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                    {otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
            </div>)}
        </>
    );
};

export default ConfirmationCode;
