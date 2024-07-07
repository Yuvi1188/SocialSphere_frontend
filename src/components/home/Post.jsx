import React, { useRef, useState, useEffect } from 'react';
import ProfileIcon from './ProfileIcon';
import { FaHeart, FaComment, FaPaperPlane, FaVolumeMute, FaVolumeUp, FaSmile } from 'react-icons/fa';
import socket from '../../socket';
import CommentDialog from '../layout/Comment';
import LikeList from '../layout/LikeList'; // Import the LikeList component
import { useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import EmojiPicker from 'emoji-picker-react';
import { NavLink } from 'react-router-dom';

const Post = ({ post }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [likeListOpen, setLikeListOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const [commentText, setCommentText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const onEmojiClick = (emojiData) => {
        setCommentText(prev => prev + emojiData.emoji);
        inputRef.current.focus();
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleLike = () => {
        socket.emit('likePost', { postId: post._id, userId: user._id });
    };

    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            socket.emit('commentPost', { postId: post._id, userId: user._id, text: commentText });
            setCommentText('');
            setShowEmojiPicker(false);
        }
    };

    useEffect(() => {
        socket.on('postLiked', ({ postId, likes }) => {
            if (postId === post._id) {
                setLikes(likes);
            }
        });

        socket.on('postCommented', ({ postId, comments }) => {
            if (postId === post._id) {
                setComments(comments);
            }
        });

        return () => {
            socket.off('postLiked');
            socket.off('postCommented');
        };
    }, [post._id]);

    const handleOnClick = () => {
        setCommentDialogOpen(true);
        togglePlayPause();
    };

    const openLikeList = () => {
        setLikeListOpen(true);
    };

    const closeLikeList = () => {
        setLikeListOpen(false);
    };
    // Calculate the time since the post was created
    const timeSincePost = formatDistanceToNow(parseISO(post.createdAt), { addSuffix: true });

    return (
        <div className="flex justify-center mt-4 w-[39.3rem]">
            <div className="bg-black text-white w-12/12 lg:w-9/12 rounded-lg shadow-lg overflow-hidden">

                <div className="flex items-center p-2 lg:p-4">
                    <ProfileIcon flexdir={'row'} user={post.user} date={timeSincePost} />
                </div>
                <div className='video-container relative' style={{ border: "0.5px solid #80808057" }}>
                    {post.isReel ? (
                        <div>
                            <video
                                ref={videoRef}
                                autoPlay
                                muted={isMuted}
                                loop
                                className="w-full"
                                onClick={togglePlayPause}
                            >
                                <source src={post.mediaUrl.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div
                                className="absolute bottom-4 right-4 bg-[#80808057] rounded-full p-2 cursor-pointer"
                                onClick={toggleMute}
                            >
                                {isMuted ? <FaVolumeMute className="text-white text-xs" /> : <FaVolumeUp className="text-white text-xs" />}
                            </div>
                        </div>
                    ) : (
                        <img src={post.mediaUrl.url} className="min-h-[22rem] object-cover" alt="Post" />
                    )}
                </div>
                <div className="w-full pt-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex space-x-4">
                            <FaHeart className="text-xl cursor-pointer" onClick={handleLike} />
                            <FaComment className="text-xl cursor-pointer" onClick={handleOnClick} />
                            <FaPaperPlane className="text-xl cursor-pointer" />
                        </div>
                    </div>

                    <p className="cursor-pointer" onClick={openLikeList}>{likes.length} likes</p>


                    <NavLink to={`/profile/${post.user._id}`}> <span className="">{post.user.username}</span></NavLink>  {post.caption}



                    <p className="cursor-pointer text-gray-600" onClick={() => setCommentDialogOpen(true)}>View all {comments.length} comments</p>
                    <div className="flex flex-col mt-2">
                        {comments.length > 0 && (
                            <div className="flex items-start space-x-2">
                                <div className='flex gap-3'>
                                    <p className="font-semibold">{comments[comments.length - 1].user.username}</p>
                                    <p>{comments[comments.length - 1].text}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center mt-2 pt-4 relative">
                        <FaSmile className="text-white h-6 w-6 mr-2 cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                        {showEmojiPicker && (
                            <div className="absolute bottom-12 left-0">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 ml-2 p-2 focus:outline-none bg-black text-white"
                        />
                        <button onClick={handleCommentSubmit} className="ml-2 p-2 text-gray-500">
                            Post
                        </button>
                    </div>
                </div>
                <CommentDialog
                    open={commentDialogOpen}
                    onClose={() => setCommentDialogOpen(false)}
                    post={post}
                    comments={comments}
                />
                {likeListOpen && (
                    <LikeList
                        likes={likes}
                        isOpen={likeListOpen}
                        closeList={closeLikeList}

                    />
                )}
            </div>
        </div>
    );
};

export default Post;