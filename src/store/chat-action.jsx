import axiosInstance from '../axiosConfig';
import { toast } from 'react-toastify';
import { setChats, setLoading, addChat, setCurrentChat } from './chat-slice';
import { useNavigate } from 'react-router-dom';

export const fetchChats = () => {
    return async (dispatch) => {
        dispatch(setLoading({ loading: true }));
        try {
            const { data } = await axiosInstance.get('messages/getchats');
            // console.log(data)
            dispatch(setChats({ chats: data.chats }));
        } catch (error) {
            toast.error('Failed to fetch chats');
        } finally {
            dispatch(setLoading({ loading: false }));
        }
    };
};

export const createChat = (userIds, isGroupChat, name, navigate) => {
    // console.log("gfdj")
    return async (dispatch) => {
        try {
            const { data } = await axiosInstance.post('/messages/createchat', { userIds, isGroupChat, name });
            dispatch(addChat({ chat: data.chat }));
            // console.log("dddddddddddd")
            navigate(`/messages/${data.chat._id}`);
            toast.success('Chat created successfully');
        } catch (error) {
            console.log(error)
            toast.error('Failed to create chat');
        }
    };
};

// Action creator for setting current chat
export const setCurrentChatAction = (chat) => {
    return async (dispatch) => {
        dispatch(setCurrentChat({ chat }));
    };
};
