import React, { useRef, useEffect, useState } from 'react';
import { FaHeart, FaComment, FaShare, FaPlay, FaPause } from 'react-icons/fa';

const Reel = React.forwardRef(({ reel, isActive, setActiveReelId }, ref) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isActive && videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
            setActiveReelId(reel._id);
        } else if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isActive, reel._id, setActiveReelId]);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
                setActiveReelId(reel._id);
            }
        }
    };

    return (
        <div
            className="relative w-full max-w-sm bg-gray-800 rounded-lg overflow-hidden"
            ref={ref}
            id={reel._id}
        >
            <video
                ref={videoRef}
                className="w-full object-cover"
                src={reel.mediaUrl.url}
                loop
                onClick={togglePlayPause}
            ></video>
            <div className="absolute inset-0 flex justify-between items-end p-4">
                <div className="flex flex-col items-end space-y-4">
                    <button className="p-2 rounded-full bg-gray-700">
                        <FaHeart size={24} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-700">
                        <FaComment size={24} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-700">
                        <FaShare size={24} />
                    </button>
                </div>
                <button className="p-2 rounded-full bg-gray-700" onClick={togglePlayPause}>
                    {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                </button>
            </div>
        </div>
    );
});

export default Reel;
