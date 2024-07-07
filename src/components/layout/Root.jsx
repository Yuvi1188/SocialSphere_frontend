import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                closeOnClick={true}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Outlet />
        </>
    )
}

export default Root
