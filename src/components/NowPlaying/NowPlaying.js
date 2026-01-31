import './NowPlaying.css';
import { useState, useEffect, useRef } from 'react';
import { formatDuration } from '../../utils/helpers';

function NowPlaying({ track, onBack, trackIndex = 1, totalTracks = 10 }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const intervalRef = useRef(null);
    const trackIdRef = useRef(track?.name);

    const duration = track?.duration || 200000;

    // Reset progress when track changes
    useEffect(() => {
        if (track?.name !== trackIdRef.current) {
            trackIdRef.current = track?.name;
            setCurrentTime(0);
            setIsPlaying(true);
        }
    }, [track]);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    const next = prev + 1000;
                    if (next >= duration) {
                        setIsPlaying(false);
                        return duration;
                    }
                    return next;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying, duration]);

    const progress = (currentTime / duration) * 100;

    if (!track) return null;

    return (
        <div className="now-playing">
            <div className="np-header">
                <span className="np-index">{trackIndex} of {totalTracks}</span>
            </div>
            
            <div className="np-content">
                <div className="np-album-art">
                    <img src={track.albumCover?.url} alt={track.album} />
                </div>

                <div className="np-track-info">
                    <div className="np-title">{track.name}</div>
                    <div className="np-artist">{track.artist?.join(', ')}</div>
                    <div className="np-album">{track.album}</div>
                </div>
            </div>

            <div className="np-progress-container">
                <div className="np-progress-bar">
                    <div className="np-progress-stripes">
                        <div 
                            className="np-progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="np-time">
                    <span>{formatDuration(currentTime)}</span>
                    <span>-{formatDuration(duration - currentTime)}</span>
                </div>
            </div>
        </div>
    );
}

export default NowPlaying;
