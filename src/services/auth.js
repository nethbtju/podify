/**
 * Spotify Authentication Service
 * Handles OAuth token management
 */

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';

const SCOPES = [
    'user-top-read',
    'user-read-private',
    'user-read-email',
];

/**
 * Generates the Spotify OAuth login URL
 */
export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

/**
 * Parses the access token from URL hash after OAuth redirect
 */
export function getTokenFromUrl() {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
}

/**
 * Stores token in localStorage with expiry
 */
export function setTokenInStorage(token) {
    const now = new Date();
    const tokenItem = {
        token: token,
        expiry: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour from now
    };
    localStorage.setItem('token', JSON.stringify(tokenItem));
}

/**
 * Retrieves valid token from localStorage, or null if expired/missing
 */
export function getTokenFromStorage() {
    const tokenItem = localStorage.getItem('token');
    
    if (!tokenItem) {
        return null;
    }

    const tokenData = JSON.parse(tokenItem);
    const now = Date.now();
    const expiryDate = Date.parse(tokenData.expiry);

    if (now > expiryDate) {
        localStorage.removeItem('token');
        return null;
    }
    
    return tokenData.token;
}

/**
 * Clears authentication token from storage
 */
export function clearToken() {
    localStorage.removeItem('token');
}
