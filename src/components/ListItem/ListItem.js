import './ListItem.css';
import { formatDuration } from '../../utils/helpers';

function ListItem({ name, artist, imgaddress, url, duration, subtitle, type = 'track' }) {
    return (
        <a href={url} className={`ListItem-wrapper ${type}`}>
            <span className="albumcover">
                <img 
                    className={`albumCoverImg item ${type === 'artist' ? 'rounded' : ''}`}
                    alt={type} 
                    src={imgaddress}
                />
            </span>
            <span className="name item">{name}</span>
            <span className="artist item">{artist}</span>
            {type === 'track' && duration && (
                <span className="duration item">{formatDuration(duration)}</span>
            )}
            {type === 'album' && subtitle && (
                <span className="duration item">{subtitle}</span>
            )}
        </a>
    );
}

export default ListItem;
