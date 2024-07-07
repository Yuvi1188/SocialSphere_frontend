import React from 'react';
import { NavLink } from 'react-router-dom';

const FollowInfo = ({ Follower, onClick }) => {
    const handleClick = () => {
        onClick(); // Close the dialog
    };

    return (
        <NavLink to={`/profile/${Follower._id}`} className="flex justify-between items-center p-4" onClick={handleClick}>
            <div className="flex items-center">
                <img
                    src={Follower.userImgUrl.url}
                    alt={Follower.username}
                    className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                    <p className="font-semibold">{Follower.username}</p>
                    <p className="text-sm text-gray-400">{Follower.fullName}</p>
                </div>
            </div>
        </NavLink>
    );
};

export default FollowInfo;