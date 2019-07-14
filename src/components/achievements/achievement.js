import React from 'react'
import styled, { keyframes } from 'styled-components'

import Icon from './icon.js'

import DateText from '../utils/date-text.js'

const enter = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);

  }
`
const Achievement = styled.div`
  margin: 1.5rem 0;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  p {
    margin: 0.5rem 0;
  }
  display: ${p => (p.hidden ? 'none' : 'flex')};
  @media screen {
    animation: ${enter} 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    animation-delay: ${p => p.delay || 0}ms;
  }
  @media print {
    display: flex;
    margin: 1rem 0;
  }
`

const Title = styled.span`
  font-weight: 600;
`

const IconWrapper = styled.div`
  width: 90px;
  height: 90px;
  margin-right: 24px;
  @media (max-width: 600px) {
    height: 60px;
    width: 60px;
    margin-right: 18px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  @media print {
    width: 50px;
    height: 50px;
  }
`

const ContentWrapper = styled.div`
  flex: 2;
  line-height: 1.4rem;
`

const DateWrapper = styled.div`
  border-left: 1px solid var(--outline);
  height: 50px;
  width: 80px;
  align-items: center;
  display: flex;
  padding-left: 16px;
  margin-left: 15px;
  justify-self: flex-end;
  @media (max-width: 600px) {
    margin-left: 5px;
  }
`

export default props => (
  <Achievement hidden={props.hidden}>
    <IconWrapper>
      <Icon type={props.icon} />
    </IconWrapper>
    <ContentWrapper>
      <Title color={props.color}>{props.title}</Title>
      <div>{props.children}</div>
    </ContentWrapper>
    <DateWrapper>
      <DateText date={props.date} endDate={props.endDate} />
    </DateWrapper>
  </Achievement>
)
