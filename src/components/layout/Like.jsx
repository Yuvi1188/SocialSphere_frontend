import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../home/ProfileIcon';

const LikeInfo = ({ user, onClick }) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <NavLink to={`/profile/${user._id}`} className="flex justify-between items-center p-4" onClick={handleClick}>
            <div className="flex items-center">
                <ProfileIcon user={user} />
            </div>
        </NavLink>
    );
};

export default LikeInfo;
