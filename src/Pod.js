import './css/App.css';
import ListItem from "./ListItem";
import Control from "./Control";
import Screen from "./Screen";
let topTracks;
function getDataFromStorage() {
    let item = localStorage.getItem("topTracks")
    // if the item doesn't exist, return null
    if (!item) {
        return null
    }

    item = JSON.parse(item)
    return item
}
function Pod() {
    topTracks = getDataFromStorage();

    if (topTracks) {
        return (
            <div className="pod">
                <Screen data={topTracks.map((card) => (
                    <ListItem name={card.name} artist={card.artist.join(', ')} plays={card.album} imgaddress={card.albumCover.url} url={card.link.spotify} duration={card.duration}/>
                ))}/>
                <Control />
            </div>
        );
    }
}

export default Pod;