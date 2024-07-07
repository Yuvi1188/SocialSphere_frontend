import React, { useRef, useState, useEffect } from 'react';
import ProfileIcon from '../home/ProfileIcon';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import { useSelector } from 'react-redux';
import socket from '../../socket';
import { FaHeart, FaComment, FaPaperPlane, FaVolumeMute, FaVolumeUp, FaSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const CommentDialog = ({ open, onClose, post, comments }) => {
    const [commentText, setCommentText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { user } = useSelector((state) => state.user);
    const videoRef = useRef(null);
    const inputRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
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

    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            // Emit comment event
            socket.emit('commentPost', { postId: post._id, userId: user._id, text: commentText });
            setCommentText('');
            setShowEmojiPicker(false);
        }
    };

    const onEmojiClick = (emojiData) => {
        setCommentText(prev => prev + emojiData.emoji);
        inputRef.current.focus();
    };

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent className="bg-black text-white rounded-lg shadow-xl p-4 flex gap-4 overflow-hidden h-[45rem]">
                <div className="w-1/2 mb-4 flex justify-center border-r-2 border-slate-600">
                    {post.isReel ? (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                muted={isMuted}
                                loop
                                className="w-full relative"
                                onClick={togglePlayPause}
                            >
                                <source src={post.mediaUrl.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute bottom-14 left-[22rem] bg-black rounded-full p-2 cursor-pointer z-10" onClick={toggleMute}>
                                {isMuted ? <FaVolumeMute className="text-white text-xs" /> : <FaVolumeUp className="text-white text-xs" />}
                            </div>
                        </>
                    ) : (
                        <img
                            className="w-full rounded-lg shadow-md"
                            src={post && post.mediaUrl && post.mediaUrl.url}
                            alt="Post"
                        />
                    )}
                </div>
                <div className="w-1/2 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4 border-b-2">
                        <div className="flex items-center">
                            {post.user && (
                                <>
                                    <ProfileIcon flexdir={'row'} user={post.user} />
                                </>
                            )}
                        </div>
                        <button onClick={onClose} className="focus:outline-none text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="mb-4">{post.caption}</p>
                    <div className="overflow-y-auto flex-1 mb-4 pr-2" style={{ maxHeight: '400px' }}>
                        {comments.slice().reverse().map((comment) => ( // Reversed the comments array here
                            <div key={comment._id} className="flex items-start mb-2 gap-3">
                                {comment.user && (
                                    <>
                                        <ProfileIcon user={comment.user} opacity={'0'} />
                                        <div className="ml-2">
                                            <p>{comment.text}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                            <FaHeart className="text-white h-6 w-6 mr-2 cursor-pointer" />
                            <FaComment className="text-white h-6 w-6 mr-2 cursor-pointer" />
                            <FaPaperPlane className="text-white h-6 w-6 cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex items-center mt-4 border-t pt-4 relative">
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
                            ref={inputRef}
                            className="flex-1 ml-2 p-2 focus:outline-none bg-black text-white"
                        />
                        <button onClick={handleCommentSubmit} className="ml-2 p-2 text-gray-500">
                            Post
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CommentDialog;