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

        return (
            <div>  <h1>
            About page
          </h1>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          <h2>hghgfhfg</h2>
          <br/>
          </div>
            )
    }
}
