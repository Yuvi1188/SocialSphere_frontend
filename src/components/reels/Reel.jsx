import React, { useRef, useState } from 'react';
import { FaHeart, FaComment, FaShare, FaEllipsisH, FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from 'react-icons/fa';

const Reel = ({ reel }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            const newMutedState = !videoRef.current.muted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
            console.log('Muted:', newMutedState);
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            const newPausedState = videoRef.current.paused;
            if (newPausedState) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
            setIsPlaying(!newPausedState);
            console.log('Paused:', newPausedState);
        }
    };

    return (
        <div className="relative w-full max-w-sm bg-gray-800 rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                className="w-full object-cover"
                src={reel.mediaUrl.url}
                autoPlay
                loop
                muted={isMuted}
                onClick={togglePlayPause}
            ></video>
            <div className="absolute top-2 right-2">
                <button className="p-2 rounded-full bg-gray-700" onClick={toggleMute}>
                    {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                </button>
            </div>
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
                <button className="p-2 rounded-full bg-gray-700">
                    <FaEllipsisH />
                </button>
            </div>
        </div>
    );
};

export default Reel;
