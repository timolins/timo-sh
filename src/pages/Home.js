import React from 'react'
import {withRouteData, Link} from 'react-static'
import convert from 'htmr'

import ProductBox from '../components/product-box'
import ProductBoxWrapper from '../components/product-box-wrapper'

import Achievement from '../components/achievement'
import AchievementWrapper from '../components/achievement-wrapper'

const renderProductBox = props => <ProductBox key={props.slug} {...props} />

export default withRouteData(({projects, achievements}) => (
  <div>
    <section>
      <h1>My Work</h1>
      <ProductBoxWrapper>
        {projects.filter(p => p.featured).map(renderProductBox)}
      </ProductBoxWrapper>
      <ProductBoxWrapper>
        {projects.filter(p => !p.featured).map(renderProductBox)}
      </ProductBoxWrapper>
    </section>
    <section>
      <h1>My Achievements</h1>
      <AchievementWrapper>
        {achievements.map(props => <Achievement {...props} />)}
      </AchievementWrapper>
    </section>
  </div>
))
