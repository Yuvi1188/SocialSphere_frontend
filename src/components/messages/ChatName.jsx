import React, { useState } from 'react';
import UserImg from '../layout/user/UserImg';
import profileimg from '../../assets/profileimg.jpg';
import { useSelector } from 'react-redux';

const ChatName = ({ chat, onSelectChat }) => {
    const { user } = useSelector((state) => state.user);
    const [userStatus, setUserStatus] = useState({});
    let chatName = '';
    let lastActiveTime = '';
    let isOnline = false;

    if (!chat.isGroupChat && chat.users.length === 2) {
        chat.users.forEach((chatUser) => {
            if (chatUser._id !== user._id) {
                chatName = chatUser.fullName;
                const lastActive = new Date(chatUser.lastActive);
                const now = new Date();
                const timeDiff = Math.abs(now - lastActive);
                const minutesDiff = Math.floor(timeDiff / (1000 * 60));
                lastActiveTime = minutesDiff < 60 ? `${minutesDiff} minutes` : `${Math.floor(minutesDiff / 60)} hours`;
                const status = userStatus[chatUser._id];
                if (status && status.status === 'online') {
                    isOnline = true;
                }
            }
        });
    } else {
        chatName = chat.name;
    }

    return (
        <li className="flex items-center space-x-2 mb-3 cursor-pointer" onClick={onSelectChat}>
            <div className="relative">
                <UserImg imag={profileimg} dim={3.2} />
                {isOnline && <span className="absolute right-0 bottom-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400"></span>}
            </div>
            <div>
                <h4 className="font-semibold">{chatName}</h4>
                <p className='text-xs'>
                    {chat.latestMessage ? chat.latestMessage.content : 'No messages yet'}
                    {isOnline ? ' • Online' : ` • Last active ${lastActiveTime} ago`}
                </p>
            </div>
        </li>
    );
};

export default ChatName;
