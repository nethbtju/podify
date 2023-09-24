import './css/Screen.css';
import battery from './battery.svg';
import ListItem from "./ListItem";

function Screen(props) {
    return (
        <div className="Screen-wrapper">
            <section className="Screen-header">
                <div className="top-shelf">
                    <span className="top-shelf-text">iPodify</span>
                    <span className="top-shelf-text">9:51 AM</span>
                    <span className="top-shelf-text">95% <img src={battery}/></span>
                </div>
                <div className="screen-title">Your Top Trending Songs</div>
            </section>
            <section className="api-list">
                {props.data}
            </section>
        </div>
    );
}

export default Screen;