import React from 'react';
import profileimg from "../../assets/profileimg.jpg";
import UserImg from '../layout/user/UserImg';
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from 'react-redux';

const ProfileIcon = ({ flexdir, user, opacity = 1, date = null }) => {
    console.log(user);
    const { user: currentUser } = useSelector((state) => state.user);

    return (
        <div className={`flex w-full flex-row justify-between items-center relative`}>
            <div className='flex flex-row items-center'>
                <UserImg imag={user.userImgUrl?.url||profileimg} dim={2.8} />
                <p className="card-title ml-2 mb-0">{user.username}</p>
                {date && (
                    <span className="text-gray-500 ml-2">{date}</span>
                )}
                {currentUser._id !== user._id && (
                    <a href="#" className="text-blue-500 no-underline ml-2" style={{ opacity: opacity }}>Follow</a>
                )}
            </div>
            <div className="ml-4" style={{ opacity: opacity }}>
                <BsThreeDots />
            </div>
        </div>
    );
}

export default ProfileIcon;