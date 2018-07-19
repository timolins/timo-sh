import React from 'react'
import {withRouteData} from 'react-static'
import convert from 'htmr'
import styled from 'styled-components'

import Achievement from './achievement.js'
import AchievementWrapper from './achievement-wrapper.js'

import Button from '../utils/button.js'

const AchievementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Achievements extends React.Component {
  state = {
    showHidden: false
  }
  toggleHidden = () => {
    this.setState(state => ({
      showHidden: !state.showHidden
    }))
  }
  render() {
    const {achievements} = this.props
    const {showHidden} = this.state

    const count = achievements.length
    const hiddenCount = achievements.filter(a => a.hidden).length

    return (
      <AchievementsWrapper>
        <AchievementWrapper>
          {achievements
            .sort((a1, a2) => new Date(a1.date) < new Date(a2.date))
            .filter(a => !a.hidden || showHidden)
            .map(props => (
              <Achievement key={props.title} {...props}>
                {convert(props.contents)}
              </Achievement>
            ))}
        </AchievementWrapper>
        {hiddenCount > 0 && (
          <Button onClick={this.toggleHidden}>
            {showHidden ? 'Show less ↑' : `Show ${hiddenCount} more ↓ `}
          </Button>
        )}
      </AchievementsWrapper>
    )
  }
}

export default withRouteData(Achievements)
