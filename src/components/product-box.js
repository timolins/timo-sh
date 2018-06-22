import React from 'react'
import styled from 'styled-components'
import {lighten} from 'polished'
import {Link} from 'react-static'

const ProductBox = styled.div`
  padding: 10px;
  height: ${p => (p.featured ? '300px' : '200px')};
  min-width: 150px;
  margin: 0 10px 10px 0;
  flex: ${p => p.flex || 1};
  order: ${p => -(p.flex || 0)};
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`

ProductBox.defaultProps = {
  color: 'rgb(200,200,200)'
}

const LabelBackground = styled.div`
  background: rgba(0, 0, 0, 0);
  position: absolute;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0;
`

const Title = styled.span``

Title.defaultProps = {
  color: 'rgb(200,200,200)'
}

export default props => (
  <ProductBox {...props}>
    <Link to={`/${props.slug}/`}>
      <Title color={props.color}>{props.title}</Title>
    </Link>
    <LabelBackground>Dere</LabelBackground>
  </ProductBox>
)
