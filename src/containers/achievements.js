import React from 'react'
import {withRouteData} from 'react-static'

import Achievement from '../components/achievement'
import AchievementWrapper from '../components/achievement-wrapper'

export default withRouteData(({achievements}) => (
  <div>
    <AchievementWrapper>
      {achievements.map(props => <Achievement {...props} />)}
    </AchievementWrapper>
  </div>
))
