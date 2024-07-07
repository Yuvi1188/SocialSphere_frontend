import React from 'react';
import UserImg from '../layout/user/UserImg';
import { NavLink } from 'react-router-dom';

const StoryIcon = ({ story }) => {
    return (
        <div className='flex flex-col justify-start items-center'>
            <NavLink to={`/story/${story._id}`}>
                <UserImg imag={story.user.userImgUrl} dim={3.9} />
            </NavLink>
            <p className="card-title ml-2 mb-0">{story.user.username}</p>
        </div>
    );
};

export default StoryIcon;