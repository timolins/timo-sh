import React from 'react'
import {withRouteData} from 'react-static'

import Project from './project'
import ProjectWrapper from './project-wrapper'

const renderProject = props => <Project key={props.slug} {...props} />

export default withRouteData(({projects}) => (
  <div>
    <ProjectWrapper>
      {projects.filter(p => p.featured).map(renderProject)}
    </ProjectWrapper>
    <ProjectWrapper>
      {projects.filter(p => !p.featured).map(renderProject)}
    </ProjectWrapper>
  </div>
))
