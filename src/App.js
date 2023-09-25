import './css/App.css';
import Credentials from "./Credentials";
import Pod from "./Pod";

function App() {
  return (
    <div className="App">
        <div className="pod-wrapper">
            <div className="title-wrapper">
                <header className="title">Podify</header>
                <span className="subtitle">Get your top artists and tracks anytime</span>
                <Credentials />
            </div>
            <Pod />
        </div>
    </div>
  );
}

export default App;
