import React from 'react'
import styled from 'styled-components'
import convert from 'htmr'

import DateText from './date-text.js'

const Achievement = styled.div`
  margin: 1.5rem 0;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  p {
    margin: 0.5rem 0;
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
`

const ContentWrapper = styled.div`
  flex: 2;
`

const DateWrapper = styled.div`
  border-left: 1px solid #eee;
  height: 50px;
  width: 80px;
  align-items: center;
  display: flex;
  padding-left: 16px;
  margin-left: 5px;
  justify-self: flex-end;
`

export default props => (
  <Achievement>
    <IconWrapper>
      <img src={props.icon} />
    </IconWrapper>
    <ContentWrapper>
      <Title color={props.color}>{props.title}</Title>
      <div>{convert(props.contents)}</div>
    </ContentWrapper>
    <DateWrapper>
      <DateText date={props.date} />
    </DateWrapper>
  </Achievement>
)
