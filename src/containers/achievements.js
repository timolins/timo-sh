import React from 'react'
import {withRouteData} from 'react-static'

import Achievement from '../components/achievement'
import AchievementWrapper from '../components/achievement-wrapper'

export default withRouteData(({achievements}) => (
  <div>
    <AchievementWrapper>
      {achievements
        .sort((a1, a2) => new Date(a1.date) < new Date(a2.date))
        .map(props => <Achievement key={props.title} {...props} />)}
    </AchievementWrapper>
  </div>
))
