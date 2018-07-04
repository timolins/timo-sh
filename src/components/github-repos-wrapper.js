import React from 'react'
import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    > * {
      &:first-child {
        margin-bottom: 6rem;
      }
    }
  }
`
