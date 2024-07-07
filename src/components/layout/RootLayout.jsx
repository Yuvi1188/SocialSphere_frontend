import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './sidebar/SideBar';
import CreatePost from '../createPost/CreatePost';
import socket from '../../socket';
import { useSelector } from 'react-redux';

const RootLayout = () => {
    const { user } = useSelector(state => state.user);
    const [newPost, setNewPost] = useState(false);

    useEffect(() => {
        socket.emit('userConnected', user._id);

        return () => {
            socket.emit('leaveChat', { userId: user._id });
        };
    }, [user]);

    return (
        <div className="flex">
            <SideBar onCreatePost={() => setNewPost(true)} />
            <main className="flex-grow ">
                <Outlet />
                {newPost && <CreatePost newPost={newPost} setNewPost={setNewPost} />}
            </main>
        </div>
    );
};

export default RootLayout;