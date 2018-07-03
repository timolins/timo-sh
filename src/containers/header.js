import React from 'react'
import {withRouteData} from 'react-static'
import convert from 'htmr'
import styled from 'styled-components'

import Header from '../components/header.js'

export default withRouteData(({about}) => <Header {...about} />)
