import './LoginButton.css';
import { loginUrl } from '../../services/auth';

function LoginButton() {
    return (
        <a className="login-button" href={loginUrl}>
            Sign in with Spotify
        </a>
    );
}

export default LoginButton;
