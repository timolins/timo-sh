import React from 'react'
import {withRouteData} from 'react-static'
import convert from 'htmr'

import Achievement from './achievement.js'
import AchievementWrapper from './achievement-wrapper.js'

export default withRouteData(({achievements}) => (
  <div>
    <AchievementWrapper>
      {achievements
        .sort((a1, a2) => new Date(a1.date) < new Date(a2.date))
        .map(props => (
          <Achievement key={props.title} {...props}>
            {convert(props.contents)}
          </Achievement>
        ))}
    </AchievementWrapper>
  </div>
))
