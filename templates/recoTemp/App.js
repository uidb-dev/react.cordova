import React from 'react';
import Navigator from 'react.cordova-navigation_controller';

import './App.css';

//--pages--//
import Home from './pages/index';
import Notification from './pages/notification';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

   // this.navigator = null;
  }

  menuClick(e, goToPage) {

    this.navigator.changePage(goToPage);
    //this.navigator.ch

    document.getElementsByClassName("active")[0].className = "";
    e.currentTarget.className = "active";
  }

  render() {
    const footerMenuHeight = 50;//px 
    const navigatorHeight = window.innerHeight - footerMenuHeight;
    return (
      [
        <Navigator
          key="Navigator"
          height={navigatorHeight + "px"}
          myComponentApp={this}
          myApp={this}
          homePageKey={"Home"}
        >

          <Home key="Home" levelPage={0} myApp={this}/>
          <Notification key="Notification" backgroundColor={"#e6e6e6"} levelPage={1} myApp={this}/>

        </Navigator>,

        <div key="footerMenu" className="footerMenu" style={{ height: footerMenuHeight + "px" }}>
          <ul>
            <li><a onClick={(e) => this.menuClick(e,"Home")} className="active" href="#home">Home</a></li>
            <li><a onClick={(e) => this.menuClick(e,"Notification")} href="#news">Notification</a></li>
            <li><a onClick={(e) => this.menuClick(e)} href="#contact">3333</a></li>
            <li><a onClick={(e) => this.menuClick(e)} href="#about">About</a></li>
          </ul>
        </div>
      ]



    );
  }
}
