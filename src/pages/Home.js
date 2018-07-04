import React from 'react'
import styled from 'styled-components'

import Header from '../containers/header'
import GithubRepos from '../containers/github-repos'
import Projects from '../containers/projects'
import Achievements from '../containers/achievements'

import Wrapper from '../components/wrapper'

export default () => (
  <div>
    <Wrapper darken>
      <Header />
    </Wrapper>
    <Wrapper big marginTop="4rem" marginBottom="8rem">
      <section>
        <h2>My Work</h2>
        <h3>Things I Have Done in the past</h3>
        <Projects />
      </section>
    </Wrapper>
    <Wrapper marginBottom="8rem">
      <section>
        <h2>My Achievements</h2>
        <h3>Dere</h3>
        <Achievements />
      </section>
    </Wrapper>
    <Wrapper big marginBottom="8rem">
      <section>
        <h2>My GitHub Activity</h2>
        <GithubRepos />
      </section>
    </Wrapper>
  </div>
)
