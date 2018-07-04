import React from 'react'
import {withRouteData} from 'react-static'
import convert from 'htmr'

import Wrapper from '../components/utils/wrapper.js'

export default withRouteData(({contact}) => (
  <Wrapper>{convert(contact.contents)}</Wrapper>
))
