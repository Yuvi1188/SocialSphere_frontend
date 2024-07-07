import React from 'react';
import { BsHeartFill } from 'react-icons/bs';

const NotificationsSideBar = ({ onClose }) => {
    return (
        <div className="w-[24] fixed h-full dark-background text-white shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Notifications</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    &times;
                </button>
            </div>
            <div className="mt-4">
                <h3 className="text-md font-semibold">Earlier</h3>
                <ul className="mt-2">
                    {/* Add notification items here */}
                    <li className="flex items-center py-2 border-b border-gray-800">
                        <BsHeartFill className="text-red-500 mr-2" size={20} />
                        <span>User 1 liked your post</span>
                    </li>
                    <li className="flex items-center py-2 border-b border-gray-800">
                        <BsHeartFill className="text-red-500 mr-2" size={20} />
                        <span>User 2 commented on your post</span>
                    </li>
                    <li className="flex items-center py-2 border-b border-gray-800">
                        <BsHeartFill className="text-red-500 mr-2" size={20} />
                        <span>User 3 started following you</span>
                    </li>
                    {/* More items */}
                </ul>
            </div>
        </div>
    );
};

export default NotificationsSideBar;
