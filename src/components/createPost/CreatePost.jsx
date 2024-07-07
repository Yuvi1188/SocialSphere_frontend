import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import UserImg from '../layout/user/UserImg';
import profileimg from '../../assets/profileimg.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../store/post-action';
import Loader from '../layout/loader/Loader';
import EmojiPicker from 'emoji-picker-react';
import { FaSmile } from 'react-icons/fa';

const CreatePost = ({ newPost, setNewPost }) => {
    const { loading } = useSelector((state) => state.user);
    const [postFile, setPostFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [caption, setCaption] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [dragged, setDragged] = useState(false);
    const { fullName } = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const handleDragChange = () => {
        setDragged(!dragged);
    };

    const handleFileChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        setPostFile(file);
        setPreview(URL.createObjectURL(file));
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', postFile);
        formData.append('caption', caption);
        dispatch(createPost(formData));
        setNewPost(false);
    };

    const onEmojiClick = (emojiData) => {
        setCaption(prev => prev + emojiData.emoji);
    };

    return (
        <>
            {loading ? (<Loader />) : (
                <Dialog open={newPost} onClose={() => setNewPost(false)} maxWidth='xl'>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:w-screen max-w-4xl rounded-md text-white" style={{ backgroundColor: '#262626' }}>
                        <div className="text-white py-3 border-b-2 border-slate-950 px-4 flex justify-between w-full">
                            <span className="font-medium">Create new post</span>
                            <button type="submit" className="text-blue-500 font-medium">Share</button>
                        </div>

                        <div className="flex sm:flex-row sm:items-start items-center flex-col w-full">
                            {preview ? (
                                <div className="h-48 sm:h-[80vh] w-full">
                                    {postFile.type.startsWith("video/") ? (
                                        <video className="object-contain h-full w-full" controls>
                                            <source src={preview} type={postFile.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img draggable="false" className="object-contain h-full w-full" src={preview} alt="post" />
                                    )}
                                </div>
                            ) : (
                                <div onDragEnter={handleDragChange} onDragLeave={handleDragChange} className={`${dragged && 'opacity-40'} relative h-36 sm:h-[80vh] w-full flex flex-col gap-2 items-center justify-center mx-16`} style={{ backgroundColor: '#262626', borderColor: '#292929' }}>
                                    <svg aria-label="Icon to represent media such as images or videos" color="#ffffff" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96">
                                        <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                                        <path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-.5 5.8-5.5 10.4-11.1 9.7zM7.2 10.8c1.5-1.7 3.6-2.7 5.8-2.8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                                        <path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                                    </svg>
                                    <p className="text-xl text-white">Drag photos and videos here</p>
                                    <input
                                        type="file"
                                        accept="video/*,image/*"
                                        onChange={handleFileChange}
                                        className="absolute h-full w-full opacity-0"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col sm:h-[80vh] w-full text-white">
                                <div className="flex gap-3 px-3 py-2 items-center">
                                    <UserImg draggable="false" imag={profileimg} dim={2.1} />
                                    <span className="text-white text-sm font-semibold">{fullName}</span>
                                </div>

                                <div className="p-3 w-full relative flex-1">
                                    <textarea
                                        className="outline-none resize-none h-32 sm:h-auto text-white w-full"
                                        style={{ backgroundColor: '#262626' }}
                                        placeholder="Write a caption..."
                                        name="caption"
                                        cols="40"
                                        rows="12"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        onClick={() => setShowEmojis(false)}
                                    ></textarea>

                                    <div className='absolute bottom-3'>
                                        <FaSmile className="text-white h-6 w-6 cursor-pointer" onClick={() => setShowEmojis(!showEmojis)} />
                                        {showEmojis && (
                                            <div className="absolute bottom-8 right-0 z-10">
                                                <EmojiPicker onEmojiClick={onEmojiClick} />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog>
            )}
        </>
    );
};

export default CreatePost;