import { userActions } from '../store/user-slice';
import axiosInstance from "../axiosConfig"
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(userActions.userReducer({
                loading: true,
                isAuthenticated: false,
                user: {},
                buttonLoading: false,
            }));
            const response = await axiosInstance.post('/users/isnewuser', userData);

            const isNewUser = response.data.isNewUser;

            if (isNewUser) {
                // If user is new, register the user information
                dispatch(userActions.userReducer({
                    loading: false,
                    isAuthenticated: false,
                    user: userData,
                    buttonLoading: false
                }));


                return Promise.resolve(); // Indicate success
            } else {
                // If user already exists, show a toast message
                toast.error('Account already exists.');
                return Promise.reject('Account already exists.');
            }
        } catch (error) {
            // Handle errors if any
            console.error('Registration failed', error);
            toast.error('Registration failed. Please try again.');
            return Promise.reject(error);
        }
    }
}

export const dobVerify = (dd, mm, yy) => {
    return async (dispatch) => {
        dispatch(userActions.userReducer({
            loading: true,
            isAuthenticated: false,
            buttonLoading: true
        }));

        try {
            const birthDate = new Date(yy, mm - 1, dd);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            dispatch(userActions.userReducer({
                loading: false,
                isAuthenticated: false,
                buttonLoading: false
            }));

            if (age > 10) {
                return true;
            } else {
                return false; // Return false for invalid age
            }
        } catch (error) {
            toast.error("Error Occurred");
            return false; // Return false if there's an error
        }
    };
};

export const sendOtp = (email) => {
  console.log(email);
    return async (dispatch) => {
        dispatch(userActions.userReducer({ buttonLoading: false, loading: false, isAuthenticated: false }));
        try {
          const response  =   await axiosInstance.post('/users/sendotp', {email} );
          console.log(response);
          console.log(response.data.success);
           if(response.data.success){
            toast.success("OTP sent successfully");
            return true;
           }
           else{
            toast.error("Failed to send OTP");
            return false;
           }
            
        } catch (error) {
            console.error('Failed to send OTP', error);
            toast.error('Failed to send OTP. Please try again.');
            dispatch(userActions.userReducer({ buttonLoading: false, loading: false, isAuthenticated: false }));
            return false;
        }
    }
}

export const verifyOtp = (otp, userData) => {
    const email = userData.email;
     
    return async (dispatch) => {
        dispatch(userActions.userReducer({ buttonLoading: true, loading: false, isAuthenticated: false }));
        try {
            // Simulating API call, replace it with actual call
          
             const response =  await axiosInstance.post('/users/verifyOtp',{otp,email});
             

            const isValid = response.data.success;

            if (isValid) {
                dispatch(userActions.userReducer({ buttonLoading: false, loading: true, isAuthenticated: false }));
                const registerResponse = await axiosInstance.post('/users/register', userData);
                 
                const token = registerResponse.data.token;
                localStorage.setItem('authToken', token);
                dispatch(userActions.userReducer({
                    loading: false,
                    isAuthenticated: true,
                    buttonLoading: false,
                }));
                return true; // Resolving promise with validity
            } else {
                dispatch(userActions.userReducer({ buttonLoading: false, loading: false, isAuthenticated: false }));
                return false; // Resolving promise with invalidity
            }
        } catch (error) {
            console.error('Failed to verify OTP', error);
            toast.error('Failed to verify OTP. Please try again.');
            dispatch(userActions.userReducer({ buttonLoading: false, loading: false, isAuthenticated: false }));
            throw error;
        }
    }
};

export const loginUser = (email, password) => {
    return async (dispatch) => {
        dispatch(userActions.userReducer({
            loading: true,
            isAuthenticated: false,
            buttonLoading: true,
        }));

        try {
            // API call for email and password authentication
            const response = await axiosInstance.post('/users/login', { email, password });

            if (response.status === 200) {
                const { token, user } = response.data;

                // Save token to localStorage
                localStorage.setItem('authToken', token);

                // Update user data in Redux store
                dispatch(userActions.userReducer({
                    loading: false,
                    isAuthenticated: true,
                    user,
                    buttonLoading: false,
                }));

                return true;
            } else {
                // Reset user data in Redux store
                dispatch(userActions.userReducer({
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    buttonLoading: false,
                }));

                return false;
            }
        } catch (error) {
            // Handle error
            console.error('Login error:', error);
            dispatch(userActions.userReducer({
                loading: false,
                isAuthenticated: false,
                user: null,
                buttonLoading: false,
            }));

            return false;
        }
    }; fcx
};

export const loadUser = () => {
    return async (dispatch) => {
        try {
            dispatch(
                userActions.userReducer({
                    loading: true,
                    isAuthenticated: false,
                    user: {},
                    buttonLoading: false
                })
            );

            if (!localStorage.getItem("authToken")) {
                throw new Error("Unauthorised");
            }
            const token = localStorage.getItem("authToken");
            const { data } = await axiosInstance.post("/users/getuser");

            if (!data) {
                throw new Error("User data not found");
            }

            dispatch(
                userActions.userReducer({
                    loading: false,
                    isAuthenticated: true,
                    user: data.user,
                    buttonLoading: false
                })
            );
        } catch (error) {
            dispatch(
                userActions.userReducer({
                    loading: false,
                    isAuthenticated: false,
                    user: {},
                    buttonLoading: false
                })
            );
        }
    };
};

export const logOutUser = () => {
    return async (dispatch) => {
        try {
            // Clear the token from local storage
            localStorage.removeItem('authToken');

            dispatch(userActions.userReducer({
                loading: false,
                isAuthenticated: false,
                user: {},
                buttonLoading: false,
            }));

            toast.success('Successfully logged out.');
            // navigate('/login');
        } catch (error) {
            console.error('Error logging out user:', error);
            toast.error('Error logging out. Please try again.');
        }
    };
};

export const updateProfile = (profileData) => {
    return async (dispatch) => {
        try {
            // Dispatch action to show loading state
            dispatch(userActions.userReducer({ loading: true, buttonLoading: false, isAuthenticated: true }));

            // Make API call to update profile
            const response = await axios.post('https://socialsphere-backend-0v3g.onrender.com/users/updateprofile', profileData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart form data
                    'Authorization': localStorage.getItem('authToken') // Include authorization token if needed
                }
            });

            // Dispatch action to hide loading state
            dispatch(userActions.userReducer({ user: response.data.user, loading: false, buttonLoading: false, isAuthenticated: true }));

            // Show success toast
            toast.success('Profile updated successfully.');
        } catch (error) {
            console.error('Failed to update profile:', error);
            // Dispatch action to hide loading state
            dispatch(userActions.userReducer({ loading: false, buttonLoading: false, isAuthenticated: true }));

            // Show error toast
            toast.error('Failed to update profile. Please try again.');
        }
    };
};
