import React from 'react';

import logoReact from '../logo.svg';
import logoCordova from '../logo-cordova.png';

export default class Index extends React.Component {

    render() {
        return <div className="App">
            <header className="App-header">
            <img src={logoCordova} className="App-logo-cordova" alt="logo react" />
                <img src={logoReact} className="App-logo" alt="logo cordova" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
               </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
             </a>
            </header>
        </div>
    }
}