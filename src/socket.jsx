import { io } from 'socket.io-client';

const socket = io('https://social-sphere-backend-rust.vercel.app/', {
    transports: ['websocket'],
});

export default socket;
