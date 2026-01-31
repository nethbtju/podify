import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl, setTokenInStorage } from '../../services/auth';
import { getTopTracks, getTopArtists, transformTrackData, transformArtistData } from '../../services/spotify';
import { saveToStorage } from '../../utils/helpers';

/**
 * Callback component - handles OAuth redirect from Spotify
 * Parses the token, fetches user data, then redirects to home
 */
function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        async function handleCallback() {
            try {
                // Parse token from URL hash
                const urlParams = getTokenFromUrl();
                const token = urlParams.access_token;

                if (token) {
                    // Store token
                    setTokenInStorage(token);

                    // Fetch and store user's top tracks
                    const tracks = await getTopTracks(token);
                    if (tracks) {
                        const transformedTracks = transformTrackData(tracks);
                        saveToStorage('topTracks', transformedTracks);
                    }

                    // Fetch and store user's top artists
                    const artists = await getTopArtists(token);
                    if (artists) {
                        const transformedArtists = transformArtistData(artists);
                        saveToStorage('topArtists', transformedArtists);
                    }
                }

                // Redirect to home page
                navigate('/');
            } catch (error) {
                console.error('Auth callback error:', error);
                navigate('/');
            }
        }

        handleCallback();
    }, [navigate]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            background: '#E5E3D8',
            fontFamily: 'Roboto, sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#00A167' }}>🎵 Loading your music...</h2>
                <p>Fetching your top tracks from Spotify</p>
            </div>
        </div>
    );
}

export default Callback;
