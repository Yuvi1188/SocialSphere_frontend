import React from 'react';
import MessageSidebar from './MessageSidebar';
import MessagesContainer from './MessagesContainer';

const Messages = () => {
    return (
        <div className="fixed flex bg-gray-100 h-screen ml-[65px]" style={{ width: 'calc(100vw - 65px)' }}>
            <div className="w-[23rem] bg-black text-white">
                <MessageSidebar />
            </div>
            <div className="flex-1 w-full">
                <MessagesContainer />
            </div>
        </div>
    );
};

export default Messages;