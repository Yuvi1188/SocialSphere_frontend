import React from 'react';
import SideBar from '../layout/sidebar/SideBar';
import PostsList from '../home/PostsList';
import Footer from '../layout/footer/Footer';
import SuggestionList from './SuggestionList';
import StoryIconList from './StoryIconList';

const Home = () => {
    return (
        <div className='flex min-h-screen text-white' style={{ backgroundColor: "#010001" }}>
            <div className='flex justify-end' style={{ width: 'calc(100vw - 220px)' }}> {/* Ensure main content starts after sidebar width */}
                <div className='flex min-h-screen'>
                    <div className='flex flex-col items-center w-3/4'>
                        <StoryIconList />
                        <PostsList />
                    </div>
                    <div className='w-1/4 ml-[-5rem]'>
                        <SuggestionList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
