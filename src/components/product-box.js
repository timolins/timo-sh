import React from 'react'
import styled from 'styled-components'
import {lighten} from 'polished'
import {Link} from 'react-static'
import Icon from './icon'

const ProductBox = styled.div`
  padding: 10px;
  height: ${p => (p.featured ? '300px' : '200px')};
  min-width: 150px;
  margin: 0 10px 10px 0;
  flex: ${p => p.flex || 1};
  order: ${p => -(p.flex || 0)};
  border: 1px solid #eee;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`

const LabelBackground = styled.div`
  background: rgba(0, 0, 0, 0);
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
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
    <LabelBackground>
      {props.types.map(type => <Icon type={type} />)}
    </LabelBackground>
  </ProductBox>
)
