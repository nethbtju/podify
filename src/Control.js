import './css/Control.css';
import next from './next.svg';
import back from './back.svg';
import playPause from './playpause.svg';
import center from './center.svg';

function Control() {
    return (
        <div className="controller-wrapper">
            <div className="controller">
                <div className="outer-level menu">Menu</div>
                <div className="mid-level">
                    <span className="back"><img src={back} alt="back button"/></span>
                    <span className="center-console"><img src={center}/></span>
                    <span className="seek"><img src={next}/></span>
                </div>
                <div className="outer-level">
                    <img src={playPause} alt="play/pause"/>
                </div>
            </div>
        </div>
    );
}

export default Control;
