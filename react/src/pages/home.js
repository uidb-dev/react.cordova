import React from 'react';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //myChildrens: false
    }

  }


  componentWillMount() {
  }

  render() {
    const fthis = this;
    return (
      <div>
        home page
      </div>

    );
  }

}


