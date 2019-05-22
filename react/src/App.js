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
    //
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

    return (
      [<ManagerPages
        myApp={this}
        //onChangePage={(nowPage) => { this.setState({ nowPage: nowPage }); }}
        homePageKey={"home"}>
        <Home key="home" levelPage={0} />
        <About key="about" levelPage={1} />
      </ManagerPages>

        , <div style={{
          position: "fixed"
          , bottom: 0
          ,zIndex: 10
        }}>
        <button style={{ width: "100px", height: "80px", backgroundColor: "bisque" }}
          onClick={() => { this.managerPages.changePage("about"); }}> go to about</button>
        <button style={{ width: "100px", height: "80px", backgroundColor: "aliceblue" }}
          onClick={() => { this.managerPages.changePage("home"); }}> go to home</button>

      </div>
      ]
    );
  }
}


