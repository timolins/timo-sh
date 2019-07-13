import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { birthday } from '../../../config.json'

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
  padding: 1rem 0;
  line-height: 0;
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

const DateText = ({ date, endDate, light, alignRight }) => {
  const day = dayjs(date)
  const isCurrent = (endDate || '').toLowerCase() === 'current'
  const endDay = dayjs(isCurrent ? new Date() : endDate)

  const hasEndDate = endDate && endDay.isValid()

  const age = day.diff(birthday, 'years')

  const relevantDate = hasEndDate ? endDay : day
  const info = hasEndDate ? endDay.diff(day, 'months') : age
  const suffix = hasEndDate ? 'months' : 'y/o'

  return (
    <Wrapper light={light} alignRight={alignRight} onTouchStart={() => {}}>
      <HiddenText alignRight={alignRight}>
        <span>{info}</span> <Light>{suffix}</Light>
      </HiddenText>
      <br />
      <Text>
        <Light>{isCurrent ? 'Now' : relevantDate.format('MMM')}</Light>{' '}
        <span>{!isCurrent && relevantDate.format('YYYY')}</span>
      </Text>
    </Wrapper>
  )
}

export default DateText
