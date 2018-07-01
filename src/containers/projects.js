import React from 'react'
import {withRouteData} from 'react-static'

import ProductBox from '../components/product-box'
import ProductBoxWrapper from '../components/product-box-wrapper'

const renderProject = props => <ProductBox key={props.slug} {...props} />

export default withRouteData(({projects}) => (
  <div>
    <ProductBoxWrapper>
      {projects.filter(p => p.featured).map(renderProject)}
    </ProductBoxWrapper>
    <ProductBoxWrapper>
      {projects.filter(p => !p.featured).map(renderProject)}
    </ProductBoxWrapper>
  </div>
))
