import React from 'react';

import { storiesOf } from '@storybook/react';
import CheeseburgerMenu from '../src/index'
import MenuContainer from './menu'

storiesOf('CheeseburgerMenu', module)
  .add('normal', () => <MenuContainer/>)
  .add('with skew', () => <MenuContainer menuProps={{ skewY: -5, bottomOffset: -30 }}/>)
