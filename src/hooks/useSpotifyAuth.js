import { useEffect, useState } from 'react';
import { getTokenFromStorage } from '../services/auth';

/**
 * Custom hook for Spotify authentication status
 * Token parsing and data fetching is handled by the Callback component
 */
export function useSpotifyAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if we have a valid token in storage
        const token = getTokenFromStorage();
        setIsAuthenticated(!!token);
        setIsLoading(false);
    }, []);

    return { isAuthenticated, isLoading };
}
