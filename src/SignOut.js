import './css/App.css';

let logoutUrl = "accounts.spotify.com/logout"

function wipeLSData(){
    localStorage.removeItem("token")
    localStorage.removeItem("topTracks")
    localStorage.removeItem("topArtists")
}
function SignOut() {
    return (
        <a className="logbutton" onClick={wipeLSData} href={logoutUrl}>Sign out of Spotify</a>
    );
}

export default SignOut;