import React from 'react';
import FollowInfo from './followInfo'; // Ensure the path is correct
import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';


const FollowList = ({ listType, closeList }) => {
    const { following, follower } = useSelector(state => state.follow);
    const list = listType === 'following' ? following : follower;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto z-10">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold mx-auto">
                        {listType === 'following' ? 'Following' : 'Followers'}
                    </h2>
                    <button
                        onClick={closeList}
                        className="p-2 bg-gray-900 text-white rounded-lg border border-gray-700"
                    >
                        <FaTimes /> {/* Use the close icon */}
                    </button>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-700">
                    {list.map((item, index) => (
                        <FollowInfo onClick={closeList} key={index} Follower={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowList;