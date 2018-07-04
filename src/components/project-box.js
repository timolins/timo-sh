import React from 'react'
import styled from 'styled-components'
import {lighten, tint} from 'polished'
import {Link} from 'react-static'
import Icon from './icon'

const ProductBox = styled.div`
  min-height: ${p => (p.featured ? '320px' : '120px')};
  min-width: 160px;
  @media (max-width: 600px) {
    ${p =>
      p.featured &&
      `
      min-height: 250px;
      min-width: 300px;
    `};
  }
  margin: 0 10px 10px 0;
  flex: ${p => p.flex || 1};
  order: ${p => -(p.flex || 0)};
  box-shadow: inset 0 0 0 1px #eee;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  &:hover {
    background: rgb(250, 250, 250);
  }
`

const Title = styled.span`
  font-weight: 600;
  line-height: 2rem;
  font-size: 1rem;
`

const ImageWrapper = styled(Link)`
  flex: 3;
  display: flex;
  background-color: white;
  border-radius: 6px 6px 0 0;
  background: ${p => (p.color ? tint(0.05, p.color) : '#FFF')};
  box-shadow: inset 0 0 0 1px ${p => (p.color ? tint(0.1, p.color) : '#EEE')};
  justify-content: center;
  align-items: center;
  opacity: 1;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  padding: 10px;
`

const DescWrapper = Wrapper.extend`
  ${p => p.featured && 'flex: 1.2'};
`
const Desc = styled.div`
  opacity: 0.7;
  font-size: 0.9rem;
`

const Iconbar = styled.div`
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`

export default props => (
  <ProductBox flex={props.flex} featured={props.featured}>
    {props.image && (
      <ImageWrapper to={`/${props.slug}/`} color={props.color}>
        <img src={props.image} alt={props.title} />
      </ImageWrapper>
    )}
    <DescWrapper featured={props.featured}>
      <Link scrollToTop={true} to={`/${props.slug}/`}>
        <Title color={props.color}>{props.title}</Title>
      </Link>
      <Desc>{props.desc}</Desc>
    </DescWrapper>
    <Wrapper>
      <Iconbar>
        {props.types.map(type => <Icon key={type} type={type} />)}
      </Iconbar>
    </Wrapper>
  </ProductBox>
)
