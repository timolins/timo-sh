import React from 'react'
import styled from 'styled-components'

import logo from './assets/logo.svg'

const Logo = styled.img`
  width: 34px;
`

export default () => <Logo src={logo} alt="Timo Lins logo" />
