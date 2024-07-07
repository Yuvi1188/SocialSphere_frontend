import axios from 'axios';

// Create an instance of axios and export it directly
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in all requests
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify request config here, e.g., add authentication token
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optionally, add response interceptor to handle errors globally
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Handle errors globally
//         if (error.response && error.response.status === 401) {
//             // Optionally redirect to login page on 401 response
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance; // Export the axios instance directly
