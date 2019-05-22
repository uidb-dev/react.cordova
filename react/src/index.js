import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as serviceWorker from './serviceWorker';


//window.appVersion = "0.0.1";


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
  // alert(deevice.cordova);

  // window.device && device.platform === 'iOS'? 
  //  alert(window.device.platform);
  // alert(window.cordova);
  //  alert(JSON.stringify(window.cordova));
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
