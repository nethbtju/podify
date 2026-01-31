import './App.css';
import LoginButton from '../LoginButton/LoginButton';
import Pod from '../Pod/Pod';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';

function App() {
    const { isAuthenticated, isLoading } = useSpotifyAuth();

    return (
        <div className="App">
            <div className="pod-wrapper">
                <div className="title-wrapper">
                    <header className="title">Podify</header>
                    <span className="subtitle">Get your top artists and tracks anytime</span>
                    <LoginButton />
                </div>
                <Pod />
            </div>
        </div>
    );
}

export default App;
