import './Pod.css';
import { useState } from 'react';
import ListItem from '../ListItem/ListItem';
import Control from '../Control/Control';
import Screen from '../Screen/Screen';
import Menu from '../Menu/Menu';
import NowPlaying from '../NowPlaying/NowPlaying';
import { getFromStorage } from '../../utils/helpers';
import { dummyTracks, dummyArtists, dummyAlbums } from '../../data/dummyData';

// Set to true to use dummy data (for development/testing)
const USE_DUMMY_DATA = true;

const VIEWS = ['tracks', 'artists', 'albums'];

function Pod() {
    const [currentView, setCurrentView] = useState('tracks');
    const [menuOpen, setMenuOpen] = useState(false);
    const [nowPlayingIndex, setNowPlayingIndex] = useState(null);

    const storedTracks = getFromStorage('topTracks');
    const storedArtists = getFromStorage('topArtists');
    
    const topTracks = USE_DUMMY_DATA ? dummyTracks : storedTracks;
    const topArtists = USE_DUMMY_DATA ? dummyArtists : storedArtists;
    const topAlbums = USE_DUMMY_DATA ? dummyAlbums : [];

    const nowPlaying = nowPlayingIndex !== null ? topTracks[nowPlayingIndex] : null;

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuSelect = (view) => {
        setCurrentView(view);
        setMenuOpen(false);
    };

    const handleNext = () => {
        if (nowPlayingIndex !== null && topTracks?.length > 0) {
            // Skip to next track
            const nextIndex = (nowPlayingIndex + 1) % topTracks.length;
            setNowPlayingIndex(nextIndex);
        } else if (!menuOpen) {
            // Cycle through views
            const currentIndex = VIEWS.indexOf(currentView);
            const nextIndex = (currentIndex + 1) % VIEWS.length;
            setCurrentView(VIEWS[nextIndex]);
        }
    };

    const handlePrev = () => {
        if (nowPlayingIndex !== null && topTracks?.length > 0) {
            // Go to previous track
            const prevIndex = (nowPlayingIndex - 1 + topTracks.length) % topTracks.length;
            setNowPlayingIndex(prevIndex);
        } else if (!menuOpen) {
            // Cycle through views
            const currentIndex = VIEWS.indexOf(currentView);
            const prevIndex = (currentIndex - 1 + VIEWS.length) % VIEWS.length;
            setCurrentView(VIEWS[prevIndex]);
        }
    };

    const handleSelect = () => {
        if (menuOpen) {
            setMenuOpen(false);
        }
    };

    const handlePlayPause = () => {
        if (nowPlayingIndex === null && topTracks?.length > 0) {
            // Start playing first track
            setNowPlayingIndex(0);
        } else if (nowPlayingIndex !== null) {
            // Stop playing
            setNowPlayingIndex(null);
        }
        setMenuOpen(false);
    };

    const getTitle = () => {
        if (nowPlayingIndex !== null) return 'Now Playing';
        switch (currentView) {
            case 'tracks': return 'Top Songs';
            case 'artists': return 'Top Artists';
            case 'albums': return 'Top Albums';
            default: return 'Top Songs';
        }
    };

    const renderContent = () => {
        if (nowPlayingIndex !== null) {
            return (
                <NowPlaying 
                    track={nowPlaying}
                    trackIndex={nowPlayingIndex + 1}
                    totalTracks={topTracks?.length || 0}
                    onBack={() => setNowPlayingIndex(null)}
                />
            );
        }

        switch (currentView) {
            case 'tracks':
                return topTracks?.map((track, index) => (
                    <ListItem 
                        key={index}
                        name={track.name} 
                        artist={track.artist.join(', ')} 
                        imgaddress={track.albumCover.url} 
                        url={track.link.spotify} 
                        duration={track.duration}
                        type="track"
                    />
                ));
            case 'artists':
                return topArtists?.map((artist, index) => (
                    <ListItem 
                        key={index}
                        name={artist.name}
                        artist={`Popularity: ${artist.popularity}`}
                        imgaddress={artist.image.url} 
                        url={artist.link.spotify}
                        type="artist"
                    />
                ));
            case 'albums':
                return topAlbums?.map((album, index) => (
                    <ListItem 
                        key={index}
                        name={album.name}
                        artist={album.artist}
                        imgaddress={album.image.url} 
                        url={album.link.spotify}
                        subtitle={album.year}
                        type="album"
                    />
                ));
            default:
                return null;
        }
    };

    if (!topTracks) {
        return null;
    }

    return (
        <div className="pod">
            <Screen 
                title={getTitle()}
                data={renderContent()}
                isNowPlaying={nowPlayingIndex !== null}
                menuOpen={menuOpen}
                menuContent={
                    <Menu 
                        currentView={currentView}
                        onSelect={handleMenuSelect}
                    />
                }
            />
            <Control 
                onMenuClick={handleMenuClick}
                onNextClick={handleNext}
                onPrevClick={handlePrev}
                onSelectClick={handleSelect}
                onPlayPauseClick={handlePlayPause}
            />
        </div>
    );
}

export default Pod;
