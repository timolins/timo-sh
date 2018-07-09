import React from 'react'
import {withRouteData} from 'react-static'
import convert from 'htmr'
import {Head} from 'react-static'

import Wrapper from '../components/utils/wrapper.js'

import config from '../../config.json'

const getEmail = () => {}

export default withRouteData(({contact}) => (
  <Wrapper>
    <Head>
      <title>{config.name} ~ Contact</title>
    </Head>
    {convert(contact.contents)}
  </Wrapper>
))
