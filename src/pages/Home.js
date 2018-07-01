import React from 'react'
import convert from 'htmr'

import GithubStars from '../containers/github-stars'
import Projects from '../containers/projects'
import Achievements from '../containers/achievements'

export default () => (
  <div>
    <section>
      <h1>My Work</h1>
      <Projects />
    </section>
    <section>
      <h1>My Achievements</h1>
      <Achievements />
    </section>
    <section>
      <h1>Repos I like</h1>
      <GithubStars />
    </section>
  </div>
)
