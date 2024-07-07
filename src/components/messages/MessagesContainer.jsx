import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../store/message-action';
import { BsEmojiSmile, BsImage, BsMic } from "react-icons/bs";
import UserImg from '../layout/user/UserImg';
import Message from './Message';
import StartChat from './StartChat';
import socket from '../../socket';
import { addMessage } from '../../store/message-slice';
import moment from 'moment';

const MessagesContainer = () => {
    const dispatch = useDispatch();
    const { chatId } = useParams();
    const { messages } = useSelector(state => state.message);
    const { chats } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.user);
    const chat = chats.find(chat => chat._id === chatId);
    const [messageInput, setMessageInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [userStatus, setUserStatus] = useState({});

    useEffect(() => {
        if (chatId) {
            dispatch(fetchMessages(chatId));
            socket.emit('joinChat', chatId);

            socket.on('receiveMessage', (Message) => {
                dispatch(addMessage({ message: Message }));
            });

            socket.on('userStatusUpdate', (statusUpdate) => {
                console.log('Status Update Received:', statusUpdate);
                setUserStatus((prevStatus) => ({
                    ...prevStatus,
                    [statusUpdate.userId]: statusUpdate,
                }));
            });

            // Emit userConnected event to get initial status
            socket.emit('userConnected', user._id);
        }

        return () => {
            if (chatId) {
                socket.emit('leaveChat', { chatId, userId: user._id });
                socket.off('receiveMessage');
                socket.off('userStatusUpdate');
            }
        };
    }, [chatId, dispatch, user._id]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim() && !selectedFile) {
            return;
        }

        let documentDataUrl = null;
        if (selectedFile) {
            documentDataUrl = await readFileAsBase64(selectedFile);
        }

        socket.emit('messages/sendmessage', { chatId, messageData: { sender: user._id, content: messageInput, chat: chatId, document: documentDataUrl } });
        setMessageInput('');
        setSelectedFile(null);
    };

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    if (!chat) {
        return <StartChat />;
    }

    let chatName = '';
    let otherUser = null;
    let otherUserStatus = '';

    if (!chat.isGroupChat && chat.users.length === 2) {
        chat.users.forEach((chatUser) => {
            if (chatUser._id !== user._id) {
                chatName = chatUser.fullName;
                otherUser = chatUser;
                const statusUpdate = userStatus[chatUser._id];
                console.log('Chat User ID:', chatUser._id, 'Status Update:', statusUpdate);
                if (statusUpdate) {
                    otherUserStatus = statusUpdate.status === 'online'
                        ? 'Online'
                        : `Last active ${moment(statusUpdate.lastActive).fromNow()}`;
                } else {
                    console.log(`No status update found for user ID: ${chatUser._id}`);
                }
            }
        });
    } else {
        chatName = chat.name;
    }

    console.log("User Status State:", userStatus);
    console.log("Other User Status:", otherUserStatus);

    return (
        <div className="flex flex-col h-screen overflow-hidden dark-background text-white">
            <div className="flex items-center p-2 border-b border-gray-700">
                <UserImg imag={otherUser ? otherUser.userImgUrl.url : profileimg} dim={2.6} />
                <div className='ml-2'>
                    <h2 className="text-sm font-semibold">{chatName}</h2>
                    <p className='text-xs'>{otherUserStatus}</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <h2 className="text-xl font-semibold mb-4">Messages</h2>
                {messages.map((msg, index) => (
                    <Message key={index} message={msg} />
                ))}
            </div>

            <div className="p-1 pl-7 m-2 flex items-center justify-between dark-background rounded-full mb-2" style={{ border: "1px solid rgb(211, 211, 211,0.4)" }}>
                <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-gray-300">
                        <BsEmojiSmile size={24} />
                    </button>
                    <label htmlFor="file-upload" className="text-white hover:text-gray-300 cursor-pointer">
                        <BsImage size={24} />
                    </label>
                    <input id="file-upload" type="file" accept="image/*, video/*, .pdf, .doc, .docx" onChange={handleFileChange} style={{ display: 'none' }} />
                    {selectedFile && (
                        <div className="flex items-center space-x-2">
                            {selectedFile.type.includes('image') ? (
                                <img src={URL.createObjectURL(selectedFile)} alt="selected file" style={{ width: '24px', height: '24px' }} />
                            ) : selectedFile.type === 'application/pdf' ? (
                                <span className="text-white">PDF</span>
                            ) : (
                                <span className="text-white">Document</span>
                            )}
                            <span className="text-white">{selectedFile.name}</span>
                        </div>
                    )}
                    <button className="text-white hover:text-gray-300">
                        <BsMic size={24} />
                    </button>
                </div>
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2 flex-1">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message"
                        className="w-full p-2 text-white bg-gray-700 rounded-full focus:outline-none"
                    />
                    <button type="submit" className="text-white hover:text-gray-300">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessagesContainer;
