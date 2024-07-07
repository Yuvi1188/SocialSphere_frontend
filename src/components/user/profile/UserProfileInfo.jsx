import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../../store/profile-action';
import { profileActions } from '../../../store/profile-slice';
import { fetchFollowers, fetchFollowings, followUser, unfollowUser } from '../../../store/follow-action';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import FollowList from './followList';
import { createChat, fetchChats } from '../../../store/chat-action';

const UserProfileInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { profile, loading, buttonLoading } = useSelector((state) => state.profile);
    const { chats } = useSelector((state) => state.chat);
    const { id } = useParams();
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [showFollowList, setShowFollowList] = useState(false);
    const [listType, setListType] = useState('');
    // const [chatExists, setChatExists] = useState(null);
    const followListRef = useRef(null);

    useEffect(() => {
        if (user && user._id && id) {
            dispatch(fetchUserProfile(id));
            setIsMyProfile(user._id === id);
        }
    }, [dispatch, user, id]);

    useEffect(() => {
        if (!chats || chats.length === 0) {
            dispatch(fetchChats());
            console.log("hello")
        }
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (followListRef.current && !followListRef.current.contains(event.target)) {
                setShowFollowList(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFollow = async () => {
        dispatch(profileActions.setButtonLoading(true));
        try {
            if (profile.isFollowing) {
                await dispatch(unfollowUser(id));
                dispatch(profileActions.updateFollowingStatus(false));
            } else {
                await dispatch(followUser(id));
                dispatch(profileActions.updateFollowingStatus(true));
            }
        } catch (error) {
            console.error('Failed to follow/unfollow user', error);
        }
        dispatch(profileActions.setButtonLoading(false));
    };

    const handleFetchFollowers = () => {
        if (profile.followersCount > 0) {
            dispatch(fetchFollowers(id));
            setListType('followers');
            setShowFollowList(true);
        }
    };

    const handleFetchFollowings = () => {
        if (profile.followingCount > 0) {
            dispatch(fetchFollowings(id));
            setListType('following');
            setShowFollowList(true);
        }
    };

    const closeFollowList = () => {
        setShowFollowList(false);
    };

    const handleSendMessage = async () => {
        try {
            // Find if a chat already exists with the user
            const chatExists = chats.find(chat => chat.users.some(user => user._id === id));

            if (chatExists) {
                // Redirect to the existing chat
                console.log("Chat already exists");
                navigate(`/messages/${chatExists._id}`);
            } else {
                // Dispatch createChat action to create a new chat with the user
                dispatch(createChat([id, user._id], false, "", navigate));
                // Once the chat is created, fetch the updated chats
                // await dispatch(fetchChats());
                // Find the newly created chat from the updated chats
                // const newChats = await getChats(); // Assuming getChats() is a function that fetches the updated chats
                // const newChat = chats.find(chat => chat.users.some(user => user._id === id));
                // Redirect to the newly created chat
            }
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };



    if (loading || !profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-white">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-300">
                    <img className="w-full h-full object-cover" src={profile.profileImg} alt="User Profile" />
                </div>
                <div className="sm:ml-6 mt-4 sm:mt-0">
                    <div className="flex flex-col sm:flex-row items-center">
                        <h1 className="text-2xl font-semibold">{profile.username}</h1>
                        {isAuthenticated && isMyProfile ? (
                            <NavLink to="/accounts">
                                <button className="bg-gray-500 text-white py-1 px-4 p-3 rounded-md text-sm ml-4">
                                    Edit Profile
                                </button>
                            </NavLink>
                        ) : (
                            <div className="flex mt-2 sm:mt-0 sm:ml-4">
                                <button
                                    onClick={handleFollow}
                                    disabled={buttonLoading}
                                    className={`bg-${profile.isFollowing ? 'gray-200' : 'blue-500'} text-${profile.isFollowing ? 'black' : 'white'} py-1 px-4 rounded-md text-sm mr-2`}
                                >
                                    {buttonLoading ? 'Loading...' : profile.isFollowing ? 'Following' : 'Follow'}
                                </button>
                                {profile.isFollowing && (
                                    <button
                                        onClick={handleFollow}
                                        className="bg-red-500 text-white py-1 px-4 rounded-md text-sm mr-2"
                                    >
                                        Unfollow
                                    </button>
                                )}
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-green-500 text-white py-1 px-4 rounded-md text-sm"
                                >
                                    Message
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex mt-4">
                        <div className='mr-4'>
                            <span className="font-semibold">{profile.postsCount || 0}</span> posts
                        </div>
                        <div className="mr-4" onClick={handleFetchFollowers} style={{ cursor: 'pointer', color: 'inherit' }}>
                            <span className="font-semibold">{profile.followersCount || 0}</span> followers
                        </div>
                        <div className="mr-4" onClick={handleFetchFollowings} style={{ cursor: 'pointer', color: 'inherit' }}>
                            <span className="font-semibold">{profile.followingCount || 0}</span> following
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="font-medium">{profile.fullName}</p>
                        <p style={{ color: "#F5F5F5" }} className='text-sm'>{profile.bio}</p>
                    </div>
                </div>
            </div>
            {showFollowList && (
                <div ref={followListRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <FollowList
                        listType={listType}
                        closeList={closeFollowList}
                    />
                </div>
            )}
        </div>
    );
};

export default UserProfileInfo;