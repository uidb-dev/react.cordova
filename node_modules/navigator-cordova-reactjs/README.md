# navigator-cordova-react_js
<h1>navigator-cordova-react_js<h1>

<h3>This will help you to manage your pages in cordova-react.js app</h3>
<h3>With this navigator the user will experience perfect return pages like you want.</h3>

<h2>Install</h2>
<pre>
<code>npm i navigator-cordova-react_js</code>
</pre>

<h2>Running</h2>
<pre><code>import navigator from "navigator-cordova-react_js";</code></pre>
 <h6>or</h6>
 <pre><code>const navigator = require('navigator-cordova-react_js');</code></pre>
<p></p>
<h2>Example</h2>
 <pre>
import Navigator from './navigator';

 ReactDOM.render(
    <div>
      <App />
    </div>,
    document.getElementById('root')
  );

  class App extends React.Component {

 constructor(props) {
    super(props);
          this.navigator={state:{historyPages:[""]}};
 }

render(){
    const nowPage=this.navigator.state.historyPages[this.navigator.state.historyPages.length - 1];
    return(
          <Navigator key="navigator" myApp={this}
            homePageName={"home"}
            listLevelPages={{
              "home": 0,
              "shopPage": 1,
              "popupPage": 9,
            }} />
            ,
            <div key="home" id="home">
                  {
                    nowPage === "home" || this.navigator.state.historyPages.includes("home")
                      ? <HomeComponent/>
                      : <div></div>
                  }
                </div>
                 <div key="shopPage" id="shopPage">
                  {
                    nowPage === "home" || this.navigator.state.historyPages.includes("home")
                      ? <ShopPageComponent/>
                      : <div></div>
                  }
                </div>
                 <div key="popupPage" id="popupPage">
                  {
                    nowPage === "home" || this.navigator.state.historyPages.includes("home")
                      ? <PopupPageComponent/>
                      : <div></div>
                  }
                </div>
    );
}
  }
</pre>

