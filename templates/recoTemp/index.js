import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const startApp = (cordovaWork) => {
    ReactDOM.render(
        <div>
            <App cordovaWork={cordovaWork} />
        </div>,
        document.getElementById('root')
    );
}

if (!window.cordova) {
    startApp(false)
} else {
    document.addEventListener('deviceready', () => {
        startApp(true);
    }, false);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
