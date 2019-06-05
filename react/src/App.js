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
import Navigator from 'react.cordova-navigation_controller';

//----Pages----//
import Home from "./pages/home";
import About from "./pages/about";

//import { ErrorConnection } from './error';

//----style----//
//---//
//"style.css" it's important style to mobile view (android ios); 
import "./css/style.css";
//---//

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      nowPage: "home"
    }

    this.cordovaWork = this.props.cordovaWork;//bool

    this.full_Height = window.innerHeight;


    this.bezy = false;


    this.media = null;
    this.MusicControls = null;

    //  this.playPause = this.playPause.bind(this);


  }

  componentDidMount() {
    //debugger

  }

  componentWillMount() {

    if (window.cordova) {

      // //---lock portrait
      // window.screen.orientation.lock('portrait');
    }
  }

  render() {

    //const full_Height = window.innerHeight;

    return (
      //---Example navigator react.cordova-navigation_controller---//
      // https://www.npmjs.com/package/react.cordova-navigation_controller
      [<Navigator
        height="92%"
        myComponentApp={this}
        onChangePage={(nowPageKey) => { this.setState({ nowPage: nowPageKey }); }}
        homePageKey={"home"}>
        <Home key="home" levelPage={0} />
        <About key="about" levelPage={1} />
      </Navigator>


        , <div style={{ height: "8%" }} className="navbar" id="myNavbar">

        <div style={{ width: "50%" }}
          onClick={() => { this.navigator.changePage("home") }}
          className={this.state.nowPage === "home" ? "active" : ""}>Home</div>

        <div style={{ width: "50%" }}
          onClick={() => {
            this.navigator.changePage("about");
          }}
          className={this.state.nowPage === "about" ? "active" : ""}>About</div>

      </div>
      ]
    );
  }
}


