import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

import {birthday} from '../../config.json'

const Light = styled.span`
  opacity: 0.5;
`

const Text = styled.div`
  display: inline-block;
  pointer-events: none;
  transition: all 300ms ease-out;
  transition-delay: 80ms;
  transform: translateY(0);
  opacity: 1;
`

const HiddenText = Text.extend`
  position: absolute;
  ${p => p.alignRight && 'right: 0'};
  transform: translateY(-30px);
  opacity: 0;
`

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: default;
  transition-duration: 200ms;
  ${p => p.light && 'color: rgba(0, 0, 0, 0.6)'};

  &:hover ${Text}, &:active ${Text} {
    transform: translateY(25px);
    opacity: 0;
  }
  &:hover ${HiddenText}, &:active ${HiddenText} {
    transform: translateY(0);
    opacity: 1;
  }
`

const DateText = ({date, light, alignRight}) => {
  const day = dayjs(date)
  const age = day.diff(birthday, 'years')
  return (
    <Wrapper light={light} onTouchStart={() => {}}>
      <HiddenText alignRight={alignRight}>
        <span>{age}</span> <Light>y/o</Light>
      </HiddenText>
      <Text>
        <Light>{day.format('MMM')}</Light> <span>{day.format('YYYY')}</span>
      </Text>
    </Wrapper>
  )
}

export default DateText
