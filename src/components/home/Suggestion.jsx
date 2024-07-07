import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../store/follow-action';
import UserImg from '../layout/user/UserImg';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const Suggestion = ({ suggestion }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const dispatch = useDispatch();
    const { profile, loading, } = useSelector((state) => state.profile);

    const handleFollow = async () => {
        setButtonLoading(true);
        console.log(suggestion);

        try {
            if (isFollowing) {
                await dispatch(unfollowUser(suggestion._id));
                setIsFollowing(false);
            } else {
                await dispatch(followUser(suggestion._id));
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Failed to follow/unfollow user', error);
        }
        setButtonLoading(false);
    };

    return (
        <div className={`flex flex-row justify-between items-center relative border-none mb-6`} style={{ width: '18rem' }}>
            <NavLink to={`/profile/${suggestion._id}`} className='no-underline text-white'>
                <div className="flex flex-row items-center">
                    <UserImg imag={suggestion.profileImg} dim={3.1} />
                    <p className="card-title ml-2 mb-0">
                        {suggestion.username}
                        <br />
                        <span>Suggested for you</span>
                    </p>
                </div>
            </NavLink>
            <div className="ml-4">
                <button
                    onClick={handleFollow}
                    disabled={buttonLoading}
                    className={`text-blue-500 ml-2 ${isFollowing ? 'text-red-500' : 'text-blue-500'}`}
                >
                    {buttonLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    );
};

export default Suggestion;