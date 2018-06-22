import React from 'react'
import {withRouteData, Link} from 'react-static'
import convert from 'htmr'

import ProductBoxWrapper from '../components/product-box-wrapper'
import ProductBox from '../components/product-box'

const renderProductBox = props => <ProductBox key={props.slug} {...props} />

export default withRouteData(({jdown, reactStatic, projects}) => (
  <div>
    <ProductBoxWrapper>
      {projects.filter(p => p.featured).map(renderProductBox)}
    </ProductBoxWrapper>
    <ProductBoxWrapper>
      {projects.filter(p => !p.featured).map(renderProductBox)}
    </ProductBoxWrapper>
  </div>
))
