import React from 'react'
import styled from 'styled-components'
import {Router, Link} from 'react-static'

import Logo from './logo'

const Nav = styled.nav`
  margin: 50px 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: black;
`

export default props => (
  <Nav>
    <Link exact to="/">
      <Logo />
    </Link>
    {props.children}
  </Nav>
)
