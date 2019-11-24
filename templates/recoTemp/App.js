import React from 'react';
import Navigator from 'react.cordova-navigation_controller';
// Learn more about the Navigator: https://www.npmjs.com/package/react.cordova-navigation_controller

import './app.css';

//--pages--//
import Home from './pages/index';
import Notification from './pages/notification';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nowPage: ""
    }
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
        onRef={ref => (this.navigator = ref)} // Required
          key="Navigator"
          height={navigatorHeight + "px"}
          myApp={this}
          // homePageKey={"Home"}
         
          onChangePage={(page) => {
            this.setState({ nowPage: page });
          }}
        >

          <Home key="Home" levelPage={0}/>
          <Notification key="Notification" backgroundColor={"#282c34"} levelPage={1} />

        </Navigator>,

        <div key="footerMenu" className="footerMenu" style={{ height: footerMenuHeight + "px" }}>
          <ul>
            <li><div onClick={(e) => this.menuClick(e, "Home")} className={this.state.nowPage === "Home" ? "active" : ""} >Home</div></li>
            <li><div onClick={(e) => this.menuClick(e, "Notification")} className={this.state.nowPage === "Notification" ? "active" : ""}>Notification</div></li>
          </ul>
        </div>
      ]



    );
  }
}
