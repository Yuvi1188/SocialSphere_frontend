import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStories } from '../../store/story-action';
import StoryIcon from './StoryIcon';
import CreateStory from '../createStory/createStory';

const StoryIconList = () => {
    const dispatch = useDispatch();
    const { stories, loading, error } = useSelector((state) => state.stories);
    const { user } = useSelector((state) => state.user);
    const [newStory, setNewStory] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const storiesPerPage = 8; // Number of stories per page

    useEffect(() => {
        if (user) {
            dispatch(fetchStories(user._id));
        }
    }, [dispatch, user]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Calculate the number of pages based on the number of stories
    const totalPages = Math.ceil(stories.length / storiesPerPage);

    // Handle next and previous page functions
    const nextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages - 1));
    };

    const prevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 0));
    };

    return (
        <div className='flex flex-col items-center'>
            <button onClick={() => setNewStory(true)} className="text-white font-medium mt-3 mb-2 bg-blue-500 px-4 py-2 rounded-md">Upload Story</button>
            <div className='flex flex-col items-center w-full'>
                <div className='w-full overflow-hidden'>
                    <div className='flex gap-4 overflow-x-auto'>
                        {stories.slice(currentPage * storiesPerPage, (currentPage + 1) * storiesPerPage).map(story => (
                            <StoryIcon key={story._id} story={story} />
                        ))}
                    </div>
                </div>
                <div className='flex justify-center mt-4'>
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`mx-2 px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                        className={`mx-2 px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Next
                    </button>
                </div>
            </div>
            <CreateStory newStory={newStory} setNewStory={setNewStory} />
        </div>
    );
};

export default StoryIconList;