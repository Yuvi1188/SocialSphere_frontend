import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        loading: false,
        chats: [],
        currentChat: null,
    },
    reducers: {
        setChats(state, action) {
            state.chats = action.payload.chats;
        },
        setLoading(state, action) {
            state.loading = action.payload.loading;
        },
        addChat(state, action) {
            state.chats.push(action.payload.chat);
        },
        setCurrentChat(state, action) {
            state.currentChat = action.payload.chat;
        },
    }
});

export const {
    setChats,
    setLoading,
    addChat,
    setCurrentChat,
} = chatSlice.actions;

export default chatSlice;
