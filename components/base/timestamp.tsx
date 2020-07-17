import dayjs from "dayjs";
import { config } from "../../config";

interface TimestampProps {
  date: Date;
  endDate?: Date | "now";
}

export const Timestamp: React.FC<TimestampProps> = ({ date, endDate }) => {
  const day = dayjs(date);
  const current = (endDate = "now");
  const endDay = dayjs(current ? new Date() : endDate);

  const hasEndDate = endDate && endDay.isValid();

  const age = day.diff(config.birthday, "year");

  const relevantDate = hasEndDate ? endDay : day;
  const info = hasEndDate ? endDay.diff(day, "month") : age;
  const suffix = hasEndDate ? "months" : "y/o";

  return (
    <div>
      <div /*alignRight={alignRight}*/>
        <span>{info}</span> <span>{suffix}</span>
      </div>
      <br />
      <div>
        <span>{current ? "Now" : relevantDate.format("MMM")}</span>{" "}
        <span>{!current && relevantDate.format("YYYY")}</span>
      </div>
    </div>
  );
};

/*
import React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { birthday } from '../../../config.json'

const Light = styled.span`
  opacity: var(--faded);
`

const Text = styled.div`
  display: inline-block;
  pointer-events: none;
  transition: all 300ms ease-out;
  transition-delay: 80ms;
  transform: translateY(0);
  opacity: 1;

  @media print {
    opacity: 1 !important;
    transform: translateY(-15px) !important;
  }
`

const HiddenText = styled(Text)`
  ${p => p.alignRight && 'right: 0'};
  transform: translateY(-30px);
  opacity: 0;

  @media print {
    opacity: 1;
    transform: translateY(15px) !important;
  }
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
  const isCurrent =
    typeof endDate === 'string' && endDate.toLowerCase() === 'current'
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
*/
