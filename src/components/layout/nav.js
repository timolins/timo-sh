import React from 'react'
import styled from 'styled-components'
import {Router, Link} from 'react-static'
import Button from '../utils/button.js'

import Logo from './logo.js'

const Nav = styled.nav`
  margin: 2rem 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: black;
`

export default props => (
  <Nav>
    <Link to="/">
      <Logo />
    </Link>
    <Link to="/contact">
      <Button>Let's talk</Button>
    </Link>
  </Nav>
)
