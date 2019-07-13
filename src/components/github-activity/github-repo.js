import React from 'react'
import styled from 'styled-components'

const Light = styled.span`
  opacity: var(--faded);
`

const Repo = styled.div`
  margin: 3rem 0;
  opacity: 1;
  position: relative;
  line-height: 1.2rem;

  &:hover {
    &:before {
      content: '';
      position: absolute;
      top: -15px;
      left: -15px;
      right: -15px;
      bottom: -15px;
      z-index: -1;
      background: rgb(248, 248, 248);
      border-radius: 5px;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 2rem 0;
    &:hover {
      &:before {
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
      }
    }
  }
`

const Desc = styled.div`
  color: rgba(0, 0, 0, 0.9);
  margin-top: 1.2rem;
`

export default ({url, owner, name, stars, desc}) => (
  <Repo>
    <a target="_blank" href={url}>
      <Light>{owner}/</Light>
      {name}
    </a>
    <Desc>{desc}</Desc>
  </Repo>
)
