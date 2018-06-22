import React from 'react'
import {withRouteData, Link} from 'react-static'
import convert from 'htmr'

export default withRouteData(({project}) => (
  <div>
    <Link to="/">{'<'} Back</Link>
    <br />
    <h3>{project.title}</h3>
    {convert(project.contents)}
  </div>
))
