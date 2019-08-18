import React from 'react';

export default class Notification extends React.Component {

    notification() {

        const this_ = this;

        navigator.notification.confirm(
            'You are the winner!', // message
            this_.onConfirm,            // callback to invoke with index of button pressed
            'Game Over',           // title
            ['Restart', 'Exit']     // buttonLabels
        );
    }

    onConfirm(buttonIndex) {
        alert('You selected button ' + buttonIndex);
    }

    render() {
        return <div>
            <h1 onClick={() => this.notification()}>Notification</h1>
        </div>
    }
}