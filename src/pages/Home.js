import React from 'react'
import styled from 'styled-components'

import Wrapper from '../components/utils/wrapper.js'

import Header from '../components/header/index.js'
import GithubActivity from '../components/github-activity/index.js'
import Projects from '../components/projects/index.js'
import Achievements from '../components/achievements/index.js'

export default () => (
  <div>
    <Wrapper darken>
      <Header />
    </Wrapper>
    <Wrapper big offset>
      <section>
        <h2>My Work</h2>
        <h3>Things I Have Done in the past</h3>
        <Projects />
      </section>
    </Wrapper>
    <Wrapper offset>
      <section>
        <h2>My Achievements</h2>
        <h3>Dere</h3>
        <Achievements />
      </section>
    </Wrapper>
    <Wrapper big offset>
      <section>
        <h2>My GitHub Activity</h2>
        <GithubActivity />
      </section>
    </Wrapper>
  </div>
)
