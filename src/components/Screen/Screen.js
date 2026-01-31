import './Screen.css';
import batteryIcon from '../../assets/icons/battery.svg';

function Screen({ data, title = 'Top Songs', isNowPlaying = false, menuOpen = false, menuContent = null }) {
    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });

    return (
        <div className="Screen-wrapper">
            <section className="Screen-header">
                <div className="top-shelf">
                    <span className="top-shelf-text">iPodify</span>
                    <span className="top-shelf-text">{timeString}</span>
                    <span className="top-shelf-text">
                        95% <img src={batteryIcon} alt="battery" />
                    </span>
                </div>
                <div className="screen-title">{title}</div>
            </section>
            <div className="screen-content-container">
                <section className={`api-list ${isNowPlaying ? 'now-playing-view' : ''}`}>
                    {data}
                </section>
                <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
                    {menuContent}
                </div>
            </div>
        </div>
    );
}

export default Screen;
