import './css/ListItem.css';

function ListItem() {
    return (
        <div className="ListItem-wrapper">
            <span className="albumcover">
                <img className="albumCoverImg item" alt="album" src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"/>
            </span>
            <span className="name item">Die For You</span>
            <span className="artist item">The Weeknd</span>
            <span className="duration item">3:59</span>
        </div>
    );
}

export default ListItem;