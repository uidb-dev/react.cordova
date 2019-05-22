import React from 'react';
//import NavigatorPages from 'navigator-cordova-reactjs';
import ManagerPages from './managerPages';
import ReactDOM from 'react-dom';

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

    // this.nowPage=""; //it's will fill from NavigatorPages

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

      //--back button in android
      document.addEventListener("backbutton"
        , (e) => {
          window.closeOrBack();
        }
        , false);
    }
  }

  render() {

    const fthis = this;

    //const full_Height = window.innerHeight;

    return (
      [<ManagerPages
        height="92%"
        myComponentApp={this}
        onChangePage={(nowPageKey) => { this.setState({ nowPage: nowPageKey }); }}
        homePageKey={"home"}>
        <Home key="home" levelPage={0} />
        <About key="about" levelPage={1} />
      </ManagerPages>


        , <div style={{ height: "8%" }} className="navbar" id="myNavbar">

        <div style={{ width: "50%" }}
          onClick={() => { this.managerPages.changePage("home") }}
          className={this.state.nowPage === "home" ? "active" : ""}>Home</div>

        <div style={{ width: "50%" }}
          onClick={() => {
            this.managerPages.changePage("about");}}
            className = {this.state.nowPage === "about" ? "active" : "" }>About</div>

      </div>
      ]
    );
  }
}


