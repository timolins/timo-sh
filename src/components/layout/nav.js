import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-static'
import { LinkButton } from '../utils/button.js'

import Logo from './logo.js'

const Nav = styled.nav`
  margin: 2rem 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: black;

  .info {
    text-align: right;
    line-height: 1.5rem;
  }
  @media print {
    align-items: flex-start;
    margin: 1rem 0 2rem;
  }
`

export default props => (
  <Nav>
    <Link to="/">
      <Logo />
    </Link>
    <Link className="screen-hidden info">
      Timo Lins
      <br />
      me@timo.sh
      <br />
      timo.sh
    </Link>
    <LinkButton className="print-hidden" to="/contact">
      Let's talk
    </LinkButton>
  </Nav>
)
