import './css/ListItem.css';
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function ListItem(props) {
    return (
        <a href={props.url} className="ListItem-wrapper">
            <span className="albumcover">
                <img className="albumCoverImg item" alt="album" src={props.imgaddress}/>
            </span>
            <span className="name item">{props.name}</span>
            <span className="artist item">{props.artist}</span>
            <span className="duration item">{millisToMinutesAndSeconds(props.duration)}</span>
        </a>
    );
}

export default ListItem;