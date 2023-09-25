import './css/App.css';
import {useEffect, useState} from "react";

const client = "f16c2a9e69494fd288dbdb29a890df02";
const redirectUri = "http://localhost:3000/";
const authEndpoint = "https://accounts.spotify.com/authorize";
const responseType = "token";

const scope = [
    "user-top-read",
    "user-read-private",
    "user-read-email"
]

// Reference code from: https://stackoverflow.com/questions/1050720/how-to-add-hours-to-a-date-object
// By: Jason Harwig
Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

export const loginUrl = `${authEndpoint}?client_id=${client}&redirect_uri=${redirectUri}&scope=${scope.join("%20")}&response_type=${responseType}&show_dialog=true`

export const getTokenFromUrl = () => {
    return window.location.hash.substring(1).split('&').reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1])

        return initial
    }, {});
};
function setUniqueUserTokenLS(token) {
    const now = new Date()

    const tokenItem = {
        token: token,
        expiry: now.addHours(1),
    }

    localStorage.setItem("token", JSON.stringify(tokenItem))
}
function getTokenFromStorage() {
    const tokenItem = localStorage.getItem("token")
    // if the item doesn't exist, return null
    if (!tokenItem) {
        return null
    }

    const tokenData = JSON.parse(tokenItem)
    let now = new Date()
    now = Date.parse(now.toString())
    const expiryDate = Date.parse(tokenData.expiry)
    // compare the expiry time of the item with the current time

    if (now > expiryDate) {
        localStorage.removeItem("token")
        return null
    }
    return tokenData.token
}

function SignIn() {

    useEffect( () => {
        // First gets the token from local storage
        let localToken = getTokenFromStorage();

        // if the token does not exist in localstorage it calls the token from url
        if (!localToken) {
            const apiCall = getTokenFromUrl()
            localToken = apiCall.access_token;
            window.location.hash = "";
            if (localToken) {
                setUniqueUserTokenLS(localToken)
            }

        }
    }, []);

    return (
            <a className="logbutton" href={loginUrl}>Sign in with Spotify</a>
    );
}

export default SignIn;