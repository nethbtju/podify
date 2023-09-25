import './css/App.css';
import SignIn from "./SignIn";
import Pod from "./Pod";
import {useEffect, useState} from "react";
import SignOut from "./SignOut";

async function fetchWebApi(token, endpoint, method, body) {

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body:JSON.stringify(body)
    });
    return await res.json();
}

async function getTopTracks(token) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(token,
        'v1/me/top/tracks?time_range=long_term&limit=10', 'GET'
    )).items;
}

async function getTopArtists(token) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(token,
        'v1/me/top/artists?time_range=long_term&limit=10', 'GET'
    )).items;
}

function getLSObject(token) {
    const tokenItem = localStorage.getItem(token)
    return JSON.parse(tokenItem)
}
function App() {
    const [trackLoading, setTrackLoading] = useState(true)
    const [artistLoading, setArtistLoading] = useState(true)

    let trackCards;
    let artistCards;

    useEffect(() => {
        let localToken = getLSObject("token");
        if (localToken) {
            localToken = localToken.token;
            getTopTracks(localToken).then((tracks) => {
                trackCards = tracks.map((track) => (
                    {
                        name: track.name,
                        artist: track.artists.map(artist => artist.name),
                        link: track.external_urls,
                        albumCover: track.album.images[0],
                        album: track.album.name,
                        duration: track.duration_ms,
                    }
                ));
                setTrackLoading(false)
                localStorage.setItem("topTracks", JSON.stringify(trackCards))
            })
            getTopArtists(localToken).then((artists) => {
                artistCards = artists.map((artist) => (
                    {
                        name: artist.name,
                        link: artist.external_urls,
                        image: artist.images[0],
                        popularity: artist.popularity
                    }
                ));
                setArtistLoading(false)
                localStorage.setItem("topArtists", JSON.stringify(artistCards))
            })
        }
    }, [])

    if ((artistLoading || trackLoading)) {
        return (
            <div className="App">
                <div className="pod-wrapper">
                    <div className="title-wrapper">
                        <header className="title">Podify</header>
                        <span className="subtitle">Get your top artists and tracks anytime</span>
                        <SignIn />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="App">
                <div className="pod-wrapper">
                    <div className="title-wrapper">
                        <header className="title">Podify</header>
                        <span className="subtitle">Get your top artists and tracks anytime</span>
                        <SignOut />
                    </div>
                    <Pod />
                </div>
            </div>
        );
    }
}

export default App;
