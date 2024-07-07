import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook instead of useHistory
import { fetchChats, createChat } from '../../store/chat-action';
// import { setCurrentChatAction } from '../../store/chat-slice';
import ChatName from './ChatName';

const MessageSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { chats } = useSelector(state => state.chat);
    // console.log(chats)

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    const handleSelectChat = (chat) => {
        // dispatch(setCurrentChatAction(chat));
        navigate(`/messages/${chat._id}`);
    };

    // const handleCreateChat = (userId) => {
    //     dispatch(createChat([userId], false,)); // Pass the user ID and false for isGroupChat
    // };

    return (
        <div className="h-screen overflow-y-auto p-10 border-r border-gray-700">
            <div>
                <h3 className="text-lg font-semibold mb-3">Messages</h3>
                <ul>
                    {chats.map(chat => (
                        <ChatName key={chat._id} chat={chat} onSelectChat={() => handleSelectChat(chat)} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MessageSidebar;
