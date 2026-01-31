import './Control.css';

function Control({ onMenuClick, onNextClick, onPrevClick, onSelectClick, onPlayPauseClick }) {
    return (
        <div className="controller-wrapper">
            <div className="controller">
                <div className="wheel-label top" onClick={onMenuClick}>MENU</div>
                <div className="wheel-row">
                    <div className="wheel-label left" onClick={onPrevClick}>◀◀</div>
                    <div className="center-button" onClick={onSelectClick}></div>
                    <div className="wheel-label right" onClick={onNextClick}>▶▶</div>
                </div>
                <div className="wheel-label bottom" onClick={onPlayPauseClick}>▶❚❚</div>
            </div>
        </div>
    );
}

export default Control;
