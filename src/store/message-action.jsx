import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';
import { setMessages, setLoading, addMessage, setCurrentChat } from './message-slice';
import socket from '../socket';

export const fetchMessages = (chatId) => {
    return async (dispatch) => {
        dispatch(setLoading({ loading: true }));
        try {
            const { data } = await axiosInstance.get(`/messages/getmessages/${chatId}`);
            dispatch(setMessages({ messages: data.messages }));
        } catch (error) {
            toast.error('Failed to fetch messages');
        } finally {
            dispatch(setLoading({ loading: false }));
        }
    };
};

export const sendMessage = (userId, chatId, content) => {
    return async (dispatch, getState) => {
        const { user } = getState();
        console.log(user._id)
        const message = { sender: userId, content, chat: chatId };

        socket.emit('messages/sendmessage', { chatId, message });
    };
};

// // Listening to new messages from the socket
// socket.on('receiveMessage', (message) => {
//     store.dispatch(addMessage({ message }));
// });
