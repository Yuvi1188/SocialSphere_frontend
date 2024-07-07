import React from 'react';
import LikeInfo from './Like'; // Ensure the path is correct
import { FaTimes } from 'react-icons/fa';
import { Dialog } from '@mui/material';

const LikeList = ({ likes, isOpen, closeList }) => {
    return (
        <Dialog open={isOpen} onClose={closeList} maxWidth="md">
            <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden w-[25rem] max-w-md mx-auto z-10 h-[25rem]">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold mx-auto">Likes</h2>
                    <button
                        onClick={closeList}
                        className="p-2 bg-gray-900 text-white rounded-lg border border-gray-700"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-700">
                    {likes.map((like, index) => (
                        <LikeInfo onClick={closeList} key={index} user={like} />
                    ))}
                </div>
            </div>
        </Dialog>
    );
};

export default LikeList;