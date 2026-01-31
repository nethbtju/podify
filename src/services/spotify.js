/**
 * Spotify API Service
 * Handles all Spotify API interactions
 */

const SPOTIFY_API_BASE = 'https://api.spotify.com';

/**
 * Generic fetch wrapper for Spotify API calls
 */
export async function fetchWebApi(token, endpoint, method = 'GET', body = null) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const res = await fetch(`${SPOTIFY_API_BASE}/${endpoint}`, config);
    return await res.json();
}

/**
 * Fetch user's top tracks
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export async function getTopTracks(token, timeRange = 'long_term', limit = 10) {
    const response = await fetchWebApi(
        token,
        `v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
        'GET'
    );
    return response.items;
}

/**
 * Fetch user's top artists
 * @see https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export async function getTopArtists(token, timeRange = 'long_term', limit = 10) {
    const response = await fetchWebApi(
        token,
        `v1/me/top/artists?time_range=${timeRange}&limit=${limit}`,
        'GET'
    );
    return response.items;
}

/**
 * Transform raw track data to app format
 */
export function transformTrackData(tracks) {
    return tracks.map((track) => ({
        name: track.name,
        artist: track.artists.map(artist => artist.name),
        link: track.external_urls,
        albumCover: track.album.images[0],
        album: track.album.name,
        duration: track.duration_ms,
    }));
}

/**
 * Transform raw artist data to app format
 */
export function transformArtistData(artists) {
    return artists.map((artist) => ({
        name: artist.name,
        link: artist.external_urls,
        image: artist.images[0],
        popularity: artist.popularity,
    }));
}
