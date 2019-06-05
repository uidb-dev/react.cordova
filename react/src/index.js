/*
Copyright 2019 Or Chuban(choban), orchoban@gmail.com

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/



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
