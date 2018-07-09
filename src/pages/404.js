import React from 'react'
import {Head} from 'react-static'

import Wrapper from '../components/utils/wrapper.js'

import config from '../../config.json'

export default () => (
  <Wrapper>
    <Head>
      <title>{config.name} ~ 404</title>
    </Head>
    <h1>404 - Oh no's! We couldn't find that page :(</h1>
  </Wrapper>
)
