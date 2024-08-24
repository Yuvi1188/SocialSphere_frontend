import React, { useState, useEffect } from 'react';
import profileimg from "../../assets/profileimg.jpg";
import UserImg from '../layout/user/UserImg';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../store/follow-action'; // Update with your actual action imports

const ProfileIcon = ({ flexdir, user, opacity = 1, date = null }) => {
    const { user: currentUser } = useSelector((state) => state.user);
    const [isFollowing, setIsFollowing] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check if the current user is following the profile user
        const checkFollowingStatus = () => {
            // Initialize user.followers to an empty array if it's undefined
            const followers = user.followers || [];
            setIsFollowing(followers.includes(currentUser._id));
        };

        checkFollowingStatus();
    }, [user, currentUser._id]);

    const handleFollow = async () => {
        setButtonLoading(true);

        try {
            if (isFollowing) {
                await dispatch(unfollowUser(user._id));
                setIsFollowing(false);
            } else {
                await dispatch(followUser(user._id));
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Failed to follow/unfollow user', error);
        }
        setButtonLoading(false);
    };

    return (
        <div className={`flex w-full flex-row justify-between items-center relative ${flexdir}`}>
            <div className='flex flex-row items-center'>
                <NavLink to={`/profile/${user._id}`} className="flex flex-row items-center">
                    <UserImg imag={user.userImgUrl?.url || profileimg} dim={2.8} />
                    <p className="card-title ml-2 mb-0">{user.username}</p>
                    {date && (
                        <span className="text-gray-500 ml-2">{date}</span>
                    )}
                </NavLink>
                {currentUser._id !== user._id && (
                    <button 
                        onClick={handleFollow} 
                        className={`ml-2 ${buttonLoading ? 'cursor-wait' : 'cursor-pointer'} text-blue-500 no-underline`} 
                        style={{ opacity: opacity }}
                        disabled={buttonLoading}
                    >
                        {buttonLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProfileIcon;
