import './css/App.css';
import Control from "./Control";
import Screen from "./Screen";

function App() {
  return (
    <div className="App">
        <div className="pod-wrapper">
            <div className="title-wrapper">
                <header className="title">Podify</header>
                <span className="subtitle">Get your top artists and tracks anytime</span>
            </div>
            <div className="pod">
                <Screen />
                <Control />
            </div>
        </div>
    </div>
  );
}

export default App;
