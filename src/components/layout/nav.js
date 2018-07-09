import React from 'react'
import styled from 'styled-components'
import {Router, Link} from 'react-static'

import Logo from './logo.js'

const Nav = styled.nav`
  margin: 2rem 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: black;
`

const Button = styled(Link)`
  position: relative;
  &:after {
    position: absolute;
    content: '';
    top: -5px;
    left: -8px;
    right: -8px;
    bottom: -5px;
    border-radius: 5px;
    background: #0366d6;
    opacity: 0.1;
    z-index: -1;
  }
`

export default props => (
  <Nav>
    <Link to="/">
      <Logo />
    </Link>
    <Button to="/contact">Let's talk</Button>
  </Nav>
)
