import { io } from 'socket.io-client';

const socket = io('https://socialsphere-backend-0v3g.onrender.com/', {
    transports: ['websocket'],
});

export default socket;
