import React from 'react';
import BrowserNotifications from 'react-browser-notifications';

export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationTitle: "",
            notificationText: "",
        }

    }

    notification() {

        const this_ = this;

        //on mobile platform
        if (window.cordova)
            if (window.cordova.platformId !== "browser") {
                //-- https://github.com/katzer/cordova-plugin-local-notifications.git  --//
                window.cordova.plugins.notification.local.schedule({
                    title: this_.state.notificationTitle,
                    text: this_.state.notificationText,
                });
                return;
            }

        //om browser platform
        if (this.browserNotifications.supported()) this.browserNotifications.show();

    }

    render() {
        const this_ = this;
        return <div className="notification_content">
            <h2>Title</h2>  <input onKeyUp={(e) => { this_.setState({ notificationTitle: e.currentTarget.value }); }} type="text" />
            <h2>Text</h2>  <input onKeyUp={(e) => { this_.setState({ notificationText: e.currentTarget.value }); }} type="text" />
            <br />
            <br />
            <button onClick={() => this.notification()}>Notification</button>

<br/>
<p>* It's will work only from <span>reco start</span> (local server on localhost), <span>mobile device</span> or <span>https url</span></p>

            {/* https://www.npmjs.com/package/react-browser-notifications */}
            <BrowserNotifications
                onRef={ref => (this_.browserNotifications = ref)} // Required
                title={this_.state.notificationTitle} // Required
                body={this_.state.notificationText}
                icon="./favicon.ico"
                timeout="3000"
                onClick={event => console.log(event)}
            />
        </div>
    }
}