import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        loading: false,
        messages: [],
        currentChat: null,
    },
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload.messages;
        },
        setLoading(state, action) {
            state.loading = action.payload.loading;
        },
        addMessage(state, action) {
            state.messages.push(action.payload.message);
        },
        setCurrentChat(state, action) {
            state.currentChat = action.payload.chat;
        },
    }
});

export const {
    setMessages,
    setLoading,
    addMessage,
    setCurrentChat
} = messageSlice.actions;

export default messageSlice;
