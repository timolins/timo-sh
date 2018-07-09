import React from 'react'
import styled from 'styled-components'
import {Head} from 'react-static'

import Wrapper from '../components/utils/wrapper.js'

import Header from '../components/header/index.js'
import GithubActivity from '../components/github-activity/index.js'
import Projects from '../components/projects/index.js'
import Achievements from '../components/achievements/index.js'

import config from '../../config.json'

export default () => (
  <div>
    <Head>
      <title>{`${config.name} ~ ${config.subtitle}`}</title>
    </Head>
    <Wrapper darken>
      <Header />
    </Wrapper>
    <Wrapper big margin>
      <section>
        <h2>My Work</h2>
        <h3>Things I Have Done in the past</h3>
        <Projects />
      </section>
    </Wrapper>
    <Wrapper margin>
      <section>
        <h2>My Achievements</h2>
        <h3>Dere</h3>
        <Achievements />
      </section>
    </Wrapper>
    <Wrapper big margin>
      <section>
        <h2>My GitHub Activity</h2>
        <GithubActivity />
      </section>
    </Wrapper>
  </div>
)
