import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

import {birthday} from '../../config.json'

const Text = styled.div`
  display: inline;
  width: 200px;
  pointer-events: none;
  position: absolute;
  transition: all 300ms ease-out;
  transition-delay: 80ms;
  transform: translateY(0);
  opacity: 1;
`

const HiddenText = Text.extend`
  transform: translateY(-30px);
  opacity: 0;
`

const Wrapper = styled.div`
  position: relative;
  height: 1rem;
  cursor: default;
  width: 80px;
  transition-duration: 200ms;

  &:hover ${Text}, &:active ${Text} {
    transform: translateY(25px);
    opacity: 0;
  }
  &:hover ${HiddenText}, &:active ${HiddenText} {
    transform: translateY(0);
    opacity: 1;
  }
`

const DateText = ({date}) => {
  const day = dayjs(date)
  const age = day.diff(birthday, 'years')
  return (
    <Wrapper onTouchStart={() => {}}>
      <HiddenText>
        <b>{age}</b> y/o
      </HiddenText>
      <Text>
        {day.format('MMM')} <b>{day.format('YYYY')}</b>
      </Text>
    </Wrapper>
  )
}

export default DateText
