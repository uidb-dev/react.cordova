import React, {Component} from 'react'

import CheeseburgerMenu from '../src/index'

class MenuContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
    }

    this.items = []
    for (let i=1; i<=100; i++) {
      this.items.push(i)
    }
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  render() {
    return <div className="menu">
      <CheeseburgerMenu isOpen={this.state.menuOpen} closeCallback={this.closeMenu.bind(this)} {...this.props.menuProps}>
        <div className="my-menu-content">
          <ul>
            {this.items.map(i => <li key={i}>
              <a href={'/thing' + i} onClick={e => e.preventDefault()}>Menu item {i}</a>
              </li>)}
          </ul>
        </div>
      </CheeseburgerMenu>
      <button onClick={this.openMenu.bind(this)}>Open menu</button>
    </div>
  }
}

export default MenuContainer
