import React from 'react'
import styled from 'styled-components'
import {lighten, transparentize} from 'polished'
import {Link} from 'react-static'
import Icon from './icon'

const ProductBox = styled.div`
  min-height: ${p => (p.featured ? '300px' : '120px')};
  min-width: 150px;
  margin: 0 10px 10px 0;
  flex: ${p => p.flex || 1};
  order: ${p => -(p.flex || 0)};
  border: 1px solid #eee;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const Title = styled.span`
  font-weight: 600;
  line-height: 2rem;
  font-size: 1rem;
`

const ImageWrapper = styled.div`
  flex: 3;
  display: flex;
  background: ${p => (p.color ? transparentize(0.9, p.color) : '#FFF')};
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  padding: 10px;
`

const DescWrapper = Wrapper.extend`
  ${p => p.showLine && 'border-top: 1px solid #eee'};
`
const Desc = styled.div`
  opacity: 0.5;
  font-size: 0.9rem;
`

const Iconbar = styled.div`
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`

export default props => (
  <ProductBox {...props}>
    {props.image && (
      <ImageWrapper {...props}>
        <img src={props.image} alt={props.title} />
      </ImageWrapper>
    )}
    <DescWrapper showLine={!!props.image}>
      <Link to={`/${props.slug}/`}>
        <Title color={props.color}>{props.title}</Title>
      </Link>
      <Desc>{props.desc}</Desc>
    </DescWrapper>
    <Wrapper>
      <Iconbar>{props.types.map(type => <Icon type={type} />)}</Iconbar>
    </Wrapper>
  </ProductBox>
)
