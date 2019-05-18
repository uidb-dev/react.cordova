import React from 'react';

export default class About extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }


    componentDidCatch(error, info) {
        console.log(
            'class component error at:' + this.name
            , new Error()
            , 'error message:', JSON.stringify(error)
            , 'info message:', JSON.stringify(info));
        this.setState({ hasError: true });
        // logErrorToMyService(error, info);
    }


    render() {

  //      const fthis = this;

        return (<h1>About</h1>)
    }
}
